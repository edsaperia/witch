"""Contact sheet: the same assets in two styles, plus a lighting test."""
from PIL import Image, ImageDraw
from spritegen import *

S = 4  # display scale
BG = (16, 14, 22)
sheet = Image.new("RGB", (1240, 980), BG)
d = ImageDraw.Draw(sheet)


def paste(img, x, y):
    sheet.paste(img, (x, y), img)


y0 = 10
for row, style in enumerate(STYLES):
    y = y0 + row * 345
    d.text((10, y), f"style: {style}", fill=(230, 230, 230))
    x = 10
    # trees: bottom, top, together
    bot, top = round_tree(3)
    for label, sp in (("trunk half", bot), ("canopy half", top), ("whole", merge(bot, top))):
        paste(render(sp, TREE_COLOURS, style, S), x, y + 20)
        d.text((x, y + 20 + sp.h * S + 2), label, fill=(150, 150, 160))
        x += sp.w * S + 10
    pb, pt = pine_tree(5)
    paste(render(merge(pb, pt), PINE_COLOURS, style, S), x, y + 20)
    x += pb.w * S + 20
    # witch
    w = witch()
    paste(render(w, WITCH_COLOURS, style, S), x, y + 60)
    d.text((x, y + 60 + w.h * S + 2), "witch", fill=(150, 150, 160))
    x += w.w * S + 20
    # three creature kinds, three levels, two walk frames
    cy = y + 20
    for kind in (11, 23, 42, 7):
        cx = x
        for level in range(3):
            for frame in range(2):
                sp = critter(kind, level, frame)
                paste(render(sp, creature_colours(kind), style, 3), cx, cy + (34 * 3 - sp.h * 3) - 20)
                cx += sp.w * 3 + 4
            cx += 10
        cy += 82

# lighting test: one creature under coloured point lights, and its normal map
y = 700
d.text((10, y), "lighting test: normal map from the silhouette; banded coloured point lights", fill=(230, 230, 230))
sp = critter(23, 2, 0)
cols = creature_colours(23)
x = 10
paste(normal_map(sp).resize((sp.w * 5, sp.h * 5), Image.NEAREST), x, y + 20)
d.text((x, y + 20 + sp.h * 5 + 2), "normal map", fill=(150, 150, 160))
x += sp.w * 5 + 20
for label, lights in (
    ("magenta light, left", [(-6, 4, 6, (255, 60, 200), 2.2)]),
    ("cyan light, right", [(sp.w + 6, 6, 6, (60, 220, 255), 2.2)]),
    ("both + warm overhead", [(-6, 4, 6, (255, 60, 200), 1.8), (sp.w + 6, 6, 6, (60, 220, 255), 1.8), (sp.w / 2, -8, 4, (255, 200, 120), 1.0)]),
):
    paste(render(sp, cols, "mossy dusk", 5, lights=lights), x, y + 20)
    d.text((x, y + 20 + sp.h * 5 + 2), label, fill=(150, 150, 160))
    x += sp.w * 5 + 20

sheet.save("contact-sheet.png")
print("ok")
