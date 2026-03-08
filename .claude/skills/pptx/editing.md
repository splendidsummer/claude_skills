# Editing Presentations

## Template-Based Workflow

When using an existing presentation as a template:

1. **Analyze existing slides**:
   ```bash
   python scripts/thumbnail.py template.pptx
   python -m markitdown template.pptx
   ```
   Review `thumbnails.jpg` to see layouts, and markitdown output to see placeholder text.

2. **Plan slide mapping**: For each content section, choose a template slide.

   ⚠️ **USE VARIED LAYOUTS** — monotonous presentations are a common failure mode. Don't default to basic title + bullet slides. Actively seek out:
   - Multi-column layouts (2-column, 3-column)
   - Image + text combinations
   - Full-bleed images with text overlay
   - Quote or callout slides
   - Section dividers
   - Stat/number callouts
   - Icon grids or icon + text rows

   **Avoid:** Repeating the same text-heavy layout for every slide.

   Match content type to layout style (e.g., key points → bullet slide, team info → multi-column, testimonials → quote slide).

3. **Unpack**: `python scripts/office/unpack.py template.pptx unpacked/`

4. **Build presentation** (do this yourself, not with subagents):
   - Delete unwanted slides (remove from `<p:sldIdLst>`)
   - Duplicate slides you want to reuse (`add_slide.py`)
   - Reorder slides in `<p:sldIdLst>`
   - **Complete all structural changes before step 5**

5. **Edit content**: Update text in each `slide{N}.xml`.
   **Use subagents here if available** — slides are separate XML files, so subagents can edit in parallel.

6. **Clean**: `python scripts/clean.py unpacked/`

7. **Pack**: `python scripts/office/pack.py unpacked/ output.pptx --original template.pptx`

---

## Scripts

| Script | Purpose |
|--------|---------|
| `unpack.py` | Extract and pretty-print PPTX |
| `add_slide.py` | Duplicate slide or create from layout |
| `clean.py` | Remove orphaned files |
| `pack.py` | Repack with validation |
| `thumbnail.py` | Create visual grid of slides |

### unpack.py

```bash
python scripts/office/unpack.py input.pptx unpacked/
```

Extracts PPTX, pretty-prints XML, escapes smart quotes.

### add_slide.py

```bash
python scripts/add_slide.py unpacked/ slide2.xml      # Duplicate slide
python scripts/add_slide.py unpacked/ slideLayout2.xml # From layout
```

Prints `<p:sldId>` to add to `<p:sldIdLst>` at desired position.

### clean.py

```bash
python scripts/clean.py unpacked/
```

Removes slides not in `<p:sldIdLst>`, unreferenced media, orphaned rels.

### pack.py

```bash
python scripts/office/pack.py unpacked/ output.pptx --original input.pptx
```

Validates, repairs, condenses XML, re-encodes smart quotes.

### thumbnail.py

```bash
python scripts/thumbnail.py input.pptx [output_prefix] [--cols N]
```

Creates `thumbnails.jpg` with slide filenames as labels. Default 3 columns, max 12 per grid.

**Use for template analysis only** (choosing layouts). For visual QA, use `soffice` + `pdftoppm` to create full-resolution individual slide images—see SKILL.md.

---

## Slide Operations

Slide order is in `ppt/presentation.xml` → `<p:sldIdLst>`.

**Reorder**: Rearrange `<p:sldId>` elements.

**Delete**: Remove `<p:sldId>`, then run `clean.py`.

**Add**: Use `add_slide.py`. Never manually copy slide files—script handles notes references, Content_Types.xml, and relationship IDs that manual copying misses.

**Duplicate slide**: Copy a slide with all its formatting intact:
```bash
python scripts/add_slide.py unpacked/ slide3.xml slide3_copy.xml
```

---

## Content Operations

### Adding Text
Edit `<a:t>` elements in slide XML:
```xml
<a:t> Your new text here</a:t>
```

For rich text with formatting:
```xml
<a:r>
  <a:rPr lang="en-US" sz="2800" b="1">
    <a:t>Bold text</a:t>
  </a:rPr>
  <a:rPr lang="en-US">
    <a:t>Normal text</a:t>
  </a:rPr>
</a:r>
```

### Adding Shapes
Insert shapes using `<p:sp>` elements:

| Shape | `prst` attribute |
|-------|------------------|
| Rectangle | `rect` |
| Oval/Circle | `ellipse` |
| Line | `line` |
| Rounded Rectangle | `roundRect` |
| Arrow | `rightArrow` |
| Triangle | `triangle` |

Example:
```xml
<p:sp>
  <p:nvSpPr>
    <a:xfrm>
      <a:off x="100000" y="100000"/>
      <a:ext cx="200000" cy="100000"/>
    </a:xfrm>
    <a:prstGeom>
      <a:prst rect="w="200000" h="100000"/>
    </a:prstGeom>
    <a:solidFill>
      <a:srgbClr val="0066FF"/>
    </a:solidFill>
  </a:spPr>
</p:sp>
```

### Adding Images
Add `<p:pic>` elements:
```xml
<p:pic>
  <p:nvPicPr>
    <a:cNvPr id="rId1"/>
  </p:nvPicPr>
</p:pic>
```

Image must to be added to `ppt/media/` folder and referenced in `[Content_Types].xml`.

### Adding Tables
Create `<a:tbl>` elements:
```xml
<a:tbl>
  <a:tr>
    <a:tc>
      <a:p>
        <a:r>
          <a:t>Header 1</a:t>
        </a:r>
      </a:p>
    </a:tc>
    <a:tc>
      <a:p>
        <a:r>
          <a:t>Header 2</a:t>
        </a:r>
      </a:p>
    </a:tc>
  </a:tr>
  <!-- data rows -->
</a:tbl>
```

### Adding Formulas

PowerPoint uses **Office Math ML (OMML)** format for equations, embedded in `<m:oMath>` or `<m:oMathPara>` elements.

**Formula structure:**
```xml
<m:oMathPara>
  <m:oMath>
    <m:r>
      <m:t>E = mc</m:t>
    </m:r>
    <m:sSup>
      <m:e><m:r><m:t>2</m:t></m:r></m:e>
    </m:sSup>
  </m:oMath>
</m:oMathPara>
```

**Common math elements:**

| Element | Purpose | Example |
|---------|---------|---------|
| `<m:r>` | Text run | `<m:r><m:t>x</m:t></m:r>` |
| `<m:sSup>` | Superscript | x² |
| `<m:sSub>` | Subscript | H₂O |
| `<m:f>` | Fraction | `<m:num>1</m:num><m:den>2</m:den>` |
| `<m:rad>` | Radical/sqrt | √x |
| `<m:nary>` | N-ary (sum, integral) | Σ, ∫ |
| `<m:acc>` | Accent (hat, bar) | x̄, x̂ |

**Adding a simple equation:**
```xml
<m:oMathPara>
  <m:oMath>
    <m:r><m:t>a</m:t></m:r>
    <m:sSup>
      <m:e><m:r><m:t>2</m:t></m:r></m:e>
    </m:sSup>
    <m:r><m:t> + b</m:t></m:r>
    <m:sSup>
      <m:e><m:r><m:t>2</m:t></m:r></m:e>
    </m:sSup>
    <m:r><m:t> = c</m:t></m:r>
    <m:sSup>
      <m:e><m:r><m:t>2</m:t></m:r></m:e>
    </m:sSup>
  </m:oMath>
</m:oMathPara>
```

**Tip**: For complex formulas, create them in PowerPoint's equation editor first, then unpack to see the OMML structure. Use pptxgenjs for programmatic formula generation if needed.

### Adding Charts
Charts are complex embedded objects. For new charts, prefer pptxgenjs. For editing existing charts:
, locate the `<c:chart>` or `<c:plotArea>` element and Chart XML structure:

```xml
<c:chart>
  <c:plotArea>
    <c:barChart>...</c:barChart>
    <c:lineChart>...</c:lineChart>
    <c:pieChart>...</c:pieChart>
  </c:plotArea>
</c:chart>
```

**Tip**: For complex visualizations, consider extracting data and creating new charts with pptxgenjs rather than modifying chart XML directly.

---

## Editing Content

**Subagents:** If available, use them here (after completing step 4). Each slide is a separate XML file, so subagents can edit in parallel. In your prompt to subagents, include:
- The slide file path(s) to edit
- **"Use the Edit tool for all changes"**
- The formatting rules and common pitfalls below

For each slide:
1. Read the slide's XML
2. Identify ALL placeholder content—text, images, charts, icons, captions
3. Replace each placeholder with final content

**Use the Edit tool, not sed or Python scripts.** The Edit tool forces specificity about what to replace and where, yielding better reliability.

### Formatting Rules

- **Bold all headers, subheadings, and inline labels**: Use `b="1"` on `<a:rPr>`. This includes:
  - Slide titles
  - Section headers within a slide
  - Inline labels like (e.g.: "Status:", "Description:") at the start of a line
- **Never use unicode bullets (•)**: Use proper list formatting with `<a:buChar>` or `<a:buAutoNum>`
- **Bullet consistency**: Let bullets inherit from the layout. Only specify `<a:buChar>` or `<a:buNone>`.

---

## Common Pitfalls

### Template Adaptation

When source content has fewer items than the template:
- **Remove excess elements entirely** (images, shapes, text boxes), don't just clear text
- Check for orphaned visuals after clearing text content
- Run visual QA to catch mismatched counts

When replacing text with different length content:
- **Shorter replacements**: Usually safe
- **Longer replacements**: May overflow or wrap unexpectedly
- Test with visual QA after text changes
- Consider truncating or splitting content to fit the template's design constraints

**Template slots ≠ Source items**: If template has 4 team members but source has 3 users, delete the 4th member's entire group (image + text boxes), not just the text.

### Multi-Item Content

If source has multiple items (numbered lists, multiple sections), create separate `<a:p>` elements for each — **never concatenate into one string**.

**❌ WRONG** — all items in one paragraph:
```xml
<a:p>
  <a:r><a:rPr .../><a:t>Step 1: Do the first thing. Step 2: Do the second thing.</a:t></a:r>
</a:p>
```

**✅ CORRECT** — separate paragraphs with bold headers:
```xml
<a:p>
  <a:pPr algn="l"><a:lnSpc><a:spcPts val="3919"/></a:lnSpc></a:pPr>
  <a:r><a:rPr lang="en-US" sz="2799" b="1" .../><a:t>Step 1</a:t></a:r>
</a:p>
<a:p>
  <a:pPr algn="l"><a:lnSpc><a:spcPts val="3919"/></a:lnSpc></a:pPr>
  <a:r><a:rPr lang="en-US" sz="2799" .../><a:t>Do the first thing.</a:t></a:r>
</a:p>
<a:p>
  <a:pPr algn="l"><a:lnSpc><a:spcPts val="3919"/></a:lnSpc></a:pPr>
  <a:r><a:rPr lang="en-US" sz="2799" b="1" .../><a:t>Step 2</a:t></a:r>
</a:p>
<!-- continue pattern -->
```

Copy `<a:pPr>` from the original paragraph to preserve line spacing. Use `b="1"` on headers.

### Smart Quotes

Handled automatically by unpack/pack. But the Edit tool converts smart quotes to ASCII.

**When adding new text with quotes, use XML entities:**

```xml
<a:t>the &#x201C;Agreement&#x201D;</a:t>
```

| Character | Name | Unicode | XML Entity |
|-----------|------|---------|------------|
| `“` | Left double quote | U+201C | `&#x201C;` |
| `”` | Right double quote | U+201D | `&#x201D;` |
| `‘` | Left single quote | U+2018 | `&#x2018;` |
| `’` | Right single quote | U+2019 | `&#x2019;` |

### Other

- **Whitespace**: Use `xml:space="preserve"` on `<a:t>` with leading/trailing spaces
- **XML parsing**: Use `defusedxml.minidom`, not `xml.etree.ElementTree` (corrupts namespaces)
