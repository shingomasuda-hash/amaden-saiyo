import sys, os
from PIL import Image, ImageDraw
Image.MAX_IMAGE_PIXELS = None

def load(p, target_w):
    im = Image.open(p).convert('RGB')
    if im.width == 2192: im = im.crop((0,0,2160,im.height))
    if im.width == 623:  im = im.crop((6,0,575,im.height))
    sc = target_w / im.width
    return im.resize((target_w, max(1, round(im.height*sc))), Image.LANCZOS), sc

def strips(design, impl, out_dir, name, n=None, strip=1200, target_w=760, dy=0):
    """side-by-side strips: design(left) vs impl(right), both normalised to target_w"""
    os.makedirs(out_dir, exist_ok=True)
    d, _ = load(design, target_w)
    i, _ = load(impl, target_w)
    H = max(d.height, i.height)
    k = 0
    y = 0
    while y < min(d.height, i.height):
        canvas = Image.new('RGB', (target_w*2+16, strip), (25,25,25))
        canvas.paste(d.crop((0, y, target_w, min(y+strip, d.height))), (0, 0))
        yi = y + dy
        canvas.paste(i.crop((0, max(0,yi), target_w, min(max(0,yi)+strip, i.height))), (target_w+16, 0))
        dr = ImageDraw.Draw(canvas)
        dr.text((4, 4), f"DESIGN y={y}", fill=(0,255,255))
        dr.text((target_w+20, 4), f"IMPL y={yi}", fill=(255,255,0))
        canvas.save(f"{out_dir}/{name}_{k:02d}.jpg", quality=86)
        k += 1; y += strip
        if n and k >= n: break
    print(f"{name}: {k} strips, design h={d.height} impl h={i.height}")

if __name__ == '__main__':
    S = sys.argv[1]
    strips('design/pc_full.jpg', f'{S}/shots/pc_closed.png', f'{S}/cmp', 'pc', target_w=760, strip=1300)
    strips('design/sp_full.jpg', f'{S}/shots/sp_closed.png', f'{S}/cmp', 'sp', target_w=420, strip=1500)
