from pathlib import Path
import re, html
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Preformatted, KeepTogether, PageBreak
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib import colors
from reportlab.lib.pagesizes import A4
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont

root=Path(__file__).resolve().parents[1]
out=root/'output/pdf/DS-Lub-Company-Data-Checklist.pdf'
out.parent.mkdir(parents=True,exist_ok=True)
pdfmetrics.registerFont(TTFont('Company','C:/Windows/Fonts/arial.ttf'))
pdfmetrics.registerFont(TTFont('CompanyBold','C:/Windows/Fonts/arialbd.ttf'))
styles=getSampleStyleSheet()
styles.add(ParagraphStyle('BodyCompany',fontName='Company',fontSize=10,leading=15,spaceAfter=8,textColor=colors.HexColor('#12263A')))
styles.add(ParagraphStyle('SectionCompany',fontName='CompanyBold',fontSize=15,leading=20,spaceBefore=18,spaceAfter=10,keepWithNext=True,textColor=colors.HexColor('#12263A')))
styles.add(ParagraphStyle('TitleCompany',fontName='CompanyBold',fontSize=24,leading=30,spaceAfter=16,textColor=colors.HexColor('#12263A')))
story=[]
code_lines=None
for line in (root/'docs/Company-Data-Checklist.md').read_text(encoding='utf-8').splitlines():
    if line.startswith('```'):
        if code_lines is None:code_lines=[]
        else:
            story.append(KeepTogether([Preformatted('\n'.join(code_lines),ParagraphStyle('CodeCompany',fontName='Courier',fontSize=9,leading=12,spaceAfter=12))]));code_lines=None
        continue
    if code_lines is not None:code_lines.append(line);continue
    if not line.strip():continue
    if line=='## Evidence handover folders':story.append(PageBreak())
    style='BodyCompany'
    if line.startswith('# '):line=line[2:];style='TitleCompany'
    elif line.startswith('## '):line=line[3:];style='SectionCompany'
    elif line.startswith('- [ ] '):line='[  ] '+line[6:]
    elif line.startswith('- '):line='• '+line[2:]
    line=line.replace('—','-').replace('–','-').replace('→','>')
    line=html.escape(line)
    line=re.sub(r'\*\*(.*?)\*\*',r'<b>\1</b>',line)
    line=re.sub(r'`(.*?)`',r'\1',line)
    # Allow long CSV identifiers and underscores to wrap within the column.
    line=line.replace('_','_<wbr/>')
    story.append(Paragraph(line,styles[style]))
def footer(c,doc):
    c.setStrokeColor(colors.HexColor('#E3E8ED'));c.line(42,39,A4[0]-42,39)
    c.setFont('Company',8);c.setFillColor(colors.HexColor('#637382'))
    c.drawString(42,26,'DS Lub / Company information & evidence / 4 October 2026')
    c.drawRightString(A4[0]-42,26,str(doc.page))
SimpleDocTemplate(str(out),pagesize=A4,rightMargin=42,leftMargin=42,topMargin=42,bottomMargin=52,title='DS Lub company information and evidence checklist',author='DS Lub').build(story,onFirstPage=footer,onLaterPages=footer)
print(out)
