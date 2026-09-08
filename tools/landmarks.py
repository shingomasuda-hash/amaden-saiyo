import sys, json
import numpy as np, cv2
from PIL import Image
Image.MAX_IMAGE_PIXELS = None

def load(p, scale_to=2160):
    im = Image.open(p).convert('RGB')
    if im.width == 2192:            # 完成デザインはスクロールバー 32px を含む
        im = im.crop((0, 0, 2160, im.height))
    if im.width == 623:             # SP 完成デザイン: 左右の余白を除去
        im = im.crop((6, 0, 575, im.height))
    if im.width != scale_to:
        im = im.resize((scale_to, round(im.height*scale_to/im.width)), Image.LANCZOS)
    return np.asarray(im).astype(np.int16)

def mask(sub, kind):
    r,g,b = sub[:,:,0], sub[:,:,1], sub[:,:,2]
    mx, mn = sub.max(2), sub.min(2)
    return {
        'red':    (r>195)&(g<70)&(b<75),
        'orange': (r>232)&(g>98)&(g<162)&(b<78),
        'dark':   (mx<130),
        'white':  (mn>240),
        'gray':   (np.abs(sub-240).max(2)<10),
    }[kind]

def bbox(a, y0, y1, x0, x1, kind):
    y1 = min(y1, a.shape[0]); x1 = min(x1, a.shape[1])
    if y0 >= y1: return None
    m = mask(a[y0:y1, x0:x1], kind)
    ys, xs = np.nonzero(m)
    if not len(xs): return None
    return (int(x0+xs.min()), int(y0+ys.min()), int(x0+xs.max()), int(y0+ys.max()))

# name, kind, search window in DESIGN coords, +- vertical slack for impl
LM = [
 ("header logo",        'red',   (20,120,40,420)),
 ("header CTA",         'red',   (10,150,1150,2160)),
 ("FV red band",        'red',   (500,660,0,1200)),
 ("FV 技術",             'white', (700,900,200,800)),
 ("FV つなぐ営業を",        'white', (900,1080,1150,2160)),
 ("FV orange band",     'orange',(1100,1280,600,2160)),
 ("sub heading",        'red',   (1560,1700,0,2160)),
 ("job red box1",       'red',   (1690,2100,1300,2160)),
 ("job photo",          'dark',  (1780,2790,100,1400)),
 ("営業経験 見出し",        'red',   (3150,3250,0,2160)),
 ("求む badge",          'red',   (3540,3720,300,1100)),
 ("求む bar1",           'white', (3860,3960,300,1700)),
 ("福利厚生 line",        'red',   (4770,4830,400,2160)),
 ("有給 tab",            'red',   (5150,5300,60,1000)),
 ("ENTRY heading",      'white', (7600,7720,300,1900)),
 ("ENTRY btn",          'white', (7760,7970,300,1700)),
 ("story block",        'red',   (8150,8620,0,900)),
 ("itv1 bars",          'red',   (8800,9030,900,2160)),
 ("story button",       'red',   (10560,10720,700,1500)),
 ("キャリア line",         'red',   (10930,11000,340,2160)),
 ("career bar1",        'orange',(11500,11900,100,200)),
 ("year bar",           'white', (12020,12160,100,2100)),
 ("役割 heading",         'dark',  (12330,12560,300,1900)),
 ("役割 numbers",         'orange',(12660,12820,100,1700)),
 ("ミスマッチ heading",      'dark',  (13600,13760,200,2000)),
 ("魅力 box",            'white', (14450,14560,0,2160)),
 ("魅力 heading",         'dark',  (14580,14780,600,1300)),
 ("創業80年 band",        'red',   (16780,16960,0,700)),
 ("募集要項 heading",       'dark',  (17980,18110,300,1900)),
 ("FAQ line",           'orange',(20960,21020,600,2160)),
 ("FAQ Q1",             'orange',(21150,21320,200,600)),
 ("form step01",        'red',   (22640,22800,700,1100)),
 ("form button",        'red',   (24180,24340,700,1500)),
 ("footer logo",        'red',   (24560,24700,800,1500)),
]

def run(design, impl):
    D = load(design); I = load(impl)
    print(f"{'landmark':22s} {'design (x0,y0,x1,y1)':30s} {'impl':30s} dx  dy  dw  dh")
    prev_dy = 0
    for name, kind, (y0,y1,x0,x1) in LM:
        d = bbox(D, y0,y1,x0,x1, kind)
        # search impl with generous vertical slack around design pos shifted by running dy
        s = 320
        i = bbox(I, y0-s+prev_dy, y1+s+prev_dy, x0,x1, kind)
        if d and i:
            dx, dy = i[0]-d[0], i[1]-d[1]
            dw, dh = (i[2]-i[0])-(d[2]-d[0]), (i[3]-i[1])-(d[3]-d[1])
            prev_dy = dy
            print(f"{name:22s} {str(d):30s} {str(i):30s} {dx:+5d} {dy:+5d} {dw:+5d} {dh:+5d}")
        else:
            print(f"{name:22s} {str(d):30s} {str(i):30s}  --")

if __name__ == '__main__':
    run(sys.argv[1], sys.argv[2])
