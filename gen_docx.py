from docx import Document
from docx.shared import Pt
from docx.enum.text import WD_ALIGN_PARAGRAPH

document = Document()

# Title
title = document.add_heading('Ganpati Reel Script: The Chhatribagh Journey', 0)
title.alignment = WD_ALIGN_PARAGRAPH.CENTER

document.add_paragraph("Location: Chhatribagh, Indore").bold = True
document.add_paragraph("Concept: A visual journey walking through the Chhatribagh mela/pandal, while the epic dialogue between Vyasa and Ganesha echoes in the background.")

document.add_heading('Scene 1: The Entrance', level=2)
p = document.add_paragraph()
p.add_run("Visual: ").bold = True
p.add_run("You are seen walking away from the camera through a stone archway, entering Chhatribagh.\n")
p.add_run("Background Dialogue (Pandit): ").bold = True
p.add_run('"Granth toh main aapka likh dunga..."')

document.add_heading('Scene 2: The Crowd & Heritage', level=2)
p = document.add_paragraph()
p.add_run("Visual: ").bold = True
p.add_run("Shots of colorful lights, people walking, and the historical stone carvings. You are walking through the crowd, looking around the mela.\n")
p.add_run("Background Dialogue (Pandit): ").bold = True
p.add_run('"...lekin ek shart hai. Aap bina ruke mere likhne ki gati se bolte rahenge."')

document.add_heading('Scene 3: The Search', level=2)
p = document.add_paragraph()
p.add_run("Visual: ").bold = True
p.add_run("You stop and look up at the sky or the massive lights above.\n")
p.add_run("Background Dialogue (Pandit): ").bold = True
p.add_run('"Agar aap zara saans lene ke liye bhi ruke, toh main likhna band kar dunga."')

document.add_heading('Scene 4: The Voice of the Lord', level=2)
p = document.add_paragraph()
p.add_run("Visual: ").bold = True
p.add_run("Quick shots of the pandal details: Aarti thali, incense smoke, people folding hands.\n")
p.add_run("Background Dialogue (Ganesha): ").bold = True
p.add_run('"Theek hai Gauri Nandan. Lekin meri bhi ek shart hai. Jo bhi chhand bolunga..."')

document.add_heading('Scene 5: The Grand Reveal', level=2)
p = document.add_paragraph()
p.add_run("Visual: ").bold = True
p.add_run("You finally reach the main stage. You stand completely still, looking up. The camera shows what you are looking at: the massive Ganesha and Sage Vyasa idol.\n")
p.add_run("Background Dialogue (Ganesha): ").bold = True
p.add_run('"...uska matlab samajhne ke baad hi aap use likhenge."')

document.add_heading('Scene 6: The Devotion', level=2)
p = document.add_paragraph()
p.add_run("Background Dialogue (Pandit): ").bold = True
p.add_run('"Mujhe sweekar hai."\n')
p.add_run("Visual: ").bold = True
p.add_run("The music drops into a high-energy Ganpati song. You are seen smiling and folding your hands in front of the idol. Fast-paced clips show the grand decorations, the aarti, and the divine energy of Bappa.")

# Save
document.save('Chhatribagh_Reel_Script.docx')
