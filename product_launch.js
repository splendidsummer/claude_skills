const pptxgen = require("pptxgenjs");

// Tech Innovation Theme Colors
const THEME = {
  electricBlue: "0066ff",
  neonCyan: "00ffff",
  darkGray: "1e1e1e",
  white: "ffffff",
  lightGray: "2a2a2a"
};

let pres = new pptxgen();
pres.layout = "LAYOUT_16x9";
pres.author = "Product Team";
pres.title = "NexusAI - Product Launch";

// ========== Slide 1: Title Slide ==========
let slide1 = pres.addSlide();
slide1.background = { color: THEME.darkGray };

// Decorative accent line
slide1.addShape(pres.shapes.RECTANGLE, {
  x: 0, y: 0, w: 0.15, h: 5.625,
  fill: { color: THEME.electricBlue }
});

// Product name
slide1.addText("NexusAI", {
  x: 0.8, y: 1.8, w: 8, h: 1,
  fontSize: 72, fontFace: "Arial Black",
  color: THEME.white, bold: true
});

// Tagline
slide1.addText("Next-Generation AI Assistant Platform", {
  x: 0.8, y: 2.9, w: 8, h: 0.6,
  fontSize: 28, fontFace: "Arial",
  color: THEME.neonCyan
});

// Subtitle
slide1.addText("Product Launch 2026", {
  x: 0.8, y: 4.2, w: 8, h: 0.4,
  fontSize: 18, fontFace: "Arial",
  color: THEME.white
});

// Decorative element
slide1.addShape(pres.shapes.OVAL, {
  x: 7.5, y: 3.5, w: 2, h: 2,
  fill: { color: THEME.electricBlue, transparency: 70 }
});

// ========== Slide 2: The Problem ==========
let slide2 = pres.addSlide();
slide2.background = { color: THEME.darkGray };

slide2.addShape(pres.shapes.RECTANGLE, {
  x: 0, y: 0, w: 0.1, h: 5.625,
  fill: { color: THEME.neonCyan }
});

slide2.addText("The Challenge", {
  x: 0.6, y: 0.4, w: 9, h: 0.8,
  fontSize: 40, fontFace: "Arial Black",
  color: THEME.white, bold: true
});

const problems = [
  { text: "信息过载", desc: "企业每天处理海量数据，效率低下" },
  { text: "重复劳动", desc: "员工 40% 时间花在重复性任务上" },
  { text: "决策延迟", desc: "缺乏实时洞察，错失市场机会" },
  { text: "成本高昂", desc: "传统 AI 解决方案部署成本过高" }
];

problems.forEach((item, i) => {
  const yPos = 1.5 + i * 1;
  slide2.addShape(pres.shapes.OVAL, {
    x: 0.6, y: yPos, w: 0.4, h: 0.4,
    fill: { color: THEME.electricBlue }
  });
  slide2.addText((i + 1).toString(), {
    x: 0.6, y: yPos, w: 0.4, h: 0.4,
    fontSize: 16, fontFace: "Arial",
    color: THEME.white, align: "center", valign: "middle", bold: true
  });
  slide2.addText(item.text, {
    x: 1.2, y: yPos - 0.05, w: 3, h: 0.35,
    fontSize: 20, fontFace: "Arial",
    color: THEME.neonCyan, bold: true
  });
  slide2.addText(item.desc, {
    x: 1.2, y: yPos + 0.3, w: 8, h: 0.3,
    fontSize: 14, fontFace: "Arial",
    color: THEME.white
  });
});

// ========== Slide 3: Introducing NexusAI ==========
let slide3 = pres.addSlide();
slide3.background = { color: THEME.darkGray };

slide3.addShape(pres.shapes.RECTANGLE, {
  x: 0, y: 0, w: 10, h: 0.1,
  fill: { color: THEME.electricBlue }
});

slide3.addText("Introducing NexusAI", {
  x: 0.5, y: 0.5, w: 9, h: 0.8,
  fontSize: 40, fontFace: "Arial Black",
  color: THEME.white, bold: true
});

slide3.addText("企业级 AI 助手平台，让智能触手可及", {
  x: 0.5, y: 1.3, w: 9, h: 0.5,
  fontSize: 22, fontFace: "Arial",
  color: THEME.neonCyan
});

// Feature cards
const features = [
  { title: "智能对话", desc: "自然语言交互\n理解上下文" },
  { title: "知识管理", desc: "自动整理\n智能检索" },
  { title: "任务自动化", desc: "流程优化\n效率提升 300%" },
  { title: "数据分析", desc: "实时洞察\n预测分析" }
];

features.forEach((f, i) => {
  const xPos = 0.5 + i * 2.3;
  slide3.addShape(pres.shapes.RECTANGLE, {
    x: xPos, y: 2.2, w: 2.1, h: 2.8,
    fill: { color: THEME.lightGray },
    line: { color: THEME.electricBlue, width: 1 }
  });
  slide3.addText(f.title, {
    x: xPos + 0.1, y: 2.4, w: 1.9, h: 0.5,
    fontSize: 16, fontFace: "Arial",
    color: THEME.neonCyan, bold: true, align: "center"
  });
  slide3.addText(f.desc, {
    x: xPos + 0.1, y: 3.0, w: 1.9, h: 1.5,
    fontSize: 12, fontFace: "Arial",
    color: THEME.white, align: "center", valign: "top"
  });
});

// ========== Slide 4: Core Features ==========
let slide4 = pres.addSlide();
slide4.background = { color: THEME.darkGray };

slide4.addShape(pres.shapes.RECTANGLE, {
  x: 0, y: 0, w: 0.1, h: 5.625,
  fill: { color: THEME.neonCyan }
});

slide4.addText("Core Features", {
  x: 0.5, y: 0.3, w: 9, h: 0.7,
  fontSize: 36, fontFace: "Arial Black",
  color: THEME.white, bold: true
});

const coreFeatures = [
  { icon: "🤖", title: "多模态 AI", desc: "支持文本、图像、语音、视频多种输入方式" },
  { icon: "⚡", title: "毫秒级响应", desc: "平均响应时间 < 100ms，流畅体验" },
  { icon: "🔒", title: "企业级安全", desc: "端到端加密，SOC2 & GDPR 合规" },
  { icon: "🔗", title: "无缝集成", desc: "支持 100+ 第三方应用一键接入" },
  { icon: "📊", title: "智能分析", desc: "AI 驱动的数据洞察与可视化" },
  { icon: "🌐", title: "多语言支持", desc: "支持 50+ 语言实时翻译" }
];

coreFeatures.forEach((f, i) => {
  const col = i % 2;
  const row = Math.floor(i / 2);
  const xPos = 0.5 + col * 4.7;
  const yPos = 1.2 + row * 1.4;

  slide4.addShape(pres.shapes.RECTANGLE, {
    x: xPos, y: yPos, w: 4.5, h: 1.2,
    fill: { color: THEME.lightGray }
  });
  slide4.addText(f.title, {
    x: xPos + 0.2, y: yPos + 0.15, w: 4, h: 0.4,
    fontSize: 16, fontFace: "Arial",
    color: THEME.neonCyan, bold: true
  });
  slide4.addText(f.desc, {
    x: xPos + 0.2, y: yPos + 0.6, w: 4, h: 0.5,
    fontSize: 12, fontFace: "Arial",
    color: THEME.white
  });
});

// ========== Slide 5: Technology Stack ==========
let slide5 = pres.addSlide();
slide5.background = { color: THEME.darkGray };

slide5.addText("Powered by Cutting-Edge AI", {
  x: 0.5, y: 0.3, w: 9, h: 0.7,
  fontSize: 36, fontFace: "Arial Black",
  color: THEME.white, bold: true
});

// Architecture diagram style
const layers = [
  { name: "应用层", color: THEME.electricBlue, items: "Web App | Mobile App | API" },
  { name: "AI 引擎", color: "0052cc", items: "NLP | CV | Speech | Reasoning" },
  { name: "数据层", color: "003d99", items: "Vector DB | Knowledge Graph | Cache" },
  { name: "基础设施", color: "002966", items: "Cloud Native | Auto-scaling | Edge" }
];

layers.forEach((layer, i) => {
  const yPos = 1.3 + i * 1;
  slide5.addShape(pres.shapes.RECTANGLE, {
    x: 1, y: yPos, w: 8, h: 0.9,
    fill: { color: layer.color }
  });
  slide5.addText(layer.name, {
    x: 1.2, y: yPos + 0.1, w: 2, h: 0.7,
    fontSize: 16, fontFace: "Arial",
    color: THEME.white, bold: true, valign: "middle"
  });
  slide5.addText(layer.items, {
    x: 3.5, y: yPos + 0.1, w: 5, h: 0.7,
    fontSize: 14, fontFace: "Arial",
    color: THEME.neonCyan, valign: "middle"
  });
});

// Stats
slide5.addText("99.9%", {
  x: 1, y: 5.0, w: 2, h: 0.4,
  fontSize: 28, fontFace: "Arial Black",
  color: THEME.neonCyan, bold: true
});
slide5.addText("运行时间保证", {
  x: 1, y: 5.4, w: 2, h: 0.3,
  fontSize: 12, fontFace: "Arial",
  color: THEME.white
});

slide5.addText("< 50ms", {
  x: 4, y: 5.0, w: 2, h: 0.4,
  fontSize: 28, fontFace: "Arial Black",
  color: THEME.neonCyan, bold: true
});
slide5.addText("P99 延迟", {
  x: 4, y: 5.4, w: 2, h: 0.3,
  fontSize: 12, fontFace: "Arial",
  color: THEME.white
});

slide5.addText("10M+", {
  x: 7, y: 5.0, w: 2, h: 0.4,
  fontSize: 28, fontFace: "Arial Black",
  color: THEME.neonCyan, bold: true
});
slide5.addText("日处理请求", {
  x: 7, y: 5.4, w: 2, h: 0.3,
  fontSize: 12, fontFace: "Arial",
  color: THEME.white
});

// ========== Slide 6: Use Cases ==========
let slide6 = pres.addSlide();
slide6.background = { color: THEME.darkGray };

slide6.addShape(pres.shapes.RECTANGLE, {
  x: 0, y: 0, w: 10, h: 0.1,
  fill: { color: THEME.electricBlue }
});

slide6.addText("Real-World Applications", {
  x: 0.5, y: 0.3, w: 9, h: 0.7,
  fontSize: 36, fontFace: "Arial Black",
  color: THEME.white, bold: true
});

const useCases = [
  { title: "客户服务", desc: "24/7 智能客服，处理 80% 常见问题", metric: "满意度 95%" },
  { title: "研发加速", desc: "代码生成、文档撰写、技术调研", metric: "效率 +200%" },
  { title: "销售赋能", desc: "智能线索评分、话术建议、合同分析", metric: "转化率 +35%" },
  { title: "运营优化", desc: "流程自动化、异常检测、报告生成", metric: "成本 -40%" }
];

useCases.forEach((uc, i) => {
  const col = i % 2;
  const row = Math.floor(i / 2);
  const xPos = 0.5 + col * 4.7;
  const yPos = 1.2 + row * 2.1;

  slide6.addShape(pres.shapes.RECTANGLE, {
    x: xPos, y: yPos, w: 4.5, h: 1.9,
    fill: { color: THEME.lightGray },
    line: { color: THEME.electricBlue, width: 1 }
  });
  slide6.addText(uc.title, {
    x: xPos + 0.2, y: yPos + 0.2, w: 4, h: 0.4,
    fontSize: 18, fontFace: "Arial",
    color: THEME.neonCyan, bold: true
  });
  slide6.addText(uc.desc, {
    x: xPos + 0.2, y: yPos + 0.7, w: 4, h: 0.6,
    fontSize: 12, fontFace: "Arial",
    color: THEME.white
  });
  slide6.addText(uc.metric, {
    x: xPos + 0.2, y: yPos + 1.4, w: 4, h: 0.3,
    fontSize: 14, fontFace: "Arial",
    color: THEME.electricBlue, bold: true
  });
});

// ========== Slide 7: Pricing ==========
let slide7 = pres.addSlide();
slide7.background = { color: THEME.darkGray };

slide7.addText("Simple, Transparent Pricing", {
  x: 0.5, y: 0.3, w: 9, h: 0.7,
  fontSize: 36, fontFace: "Arial Black",
  color: THEME.white, bold: true
});

const plans = [
  { name: "Starter", price: "$49", period: "/月", features: ["5,000 请求/月", "3 个团队成员", "基础 API", "邮件支持"], highlight: false },
  { name: "Professional", price: "$199", period: "/月", features: ["50,000 请求/月", "10 个团队成员", "完整 API", "优先支持", "高级分析"], highlight: true },
  { name: "Enterprise", price: "定制", period: "", features: ["无限请求", "无限成员", "私有部署", "SLA 保证", "专属客户成功经理"], highlight: false }
];

plans.forEach((plan, i) => {
  const xPos = 0.5 + i * 3.2;
  const bgColor = plan.highlight ? THEME.electricBlue : THEME.lightGray;
  const textColor = plan.highlight ? THEME.darkGray : THEME.white;
  const accentColor = plan.highlight ? THEME.white : THEME.neonCyan;

  slide7.addShape(pres.shapes.RECTANGLE, {
    x: xPos, y: 1.2, w: 3, h: 4,
    fill: { color: bgColor }
  });

  if (plan.highlight) {
    slide7.addText("推荐", {
      x: xPos + 0.8, y: 1.0, w: 1.4, h: 0.3,
      fontSize: 10, fontFace: "Arial",
      color: THEME.darkGray, bold: true,
      fill: { color: THEME.neonCyan }, align: "center"
    });
  }

  slide7.addText(plan.name, {
    x: xPos + 0.2, y: 1.4, w: 2.6, h: 0.4,
    fontSize: 18, fontFace: "Arial",
    color: accentColor, bold: true, align: "center"
  });
  slide7.addText(plan.price, {
    x: xPos + 0.2, y: 1.9, w: 2.6, h: 0.6,
    fontSize: 36, fontFace: "Arial Black",
    color: textColor, bold: true, align: "center"
  });
  slide7.addText(plan.period, {
    x: xPos + 0.2, y: 2.5, w: 2.6, h: 0.3,
    fontSize: 12, fontFace: "Arial",
    color: textColor, align: "center"
  });

  plan.features.forEach((f, fi) => {
    slide7.addText("✓ " + f, {
      x: xPos + 0.3, y: 3.0 + fi * 0.35, w: 2.4, h: 0.35,
      fontSize: 11, fontFace: "Arial",
      color: textColor
    });
  });
});

// ========== Slide 8: Roadmap ==========
let slide8 = pres.addSlide();
slide8.background = { color: THEME.darkGray };

slide8.addShape(pres.shapes.RECTANGLE, {
  x: 0, y: 0, w: 0.1, h: 5.625,
  fill: { color: THEME.neonCyan }
});

slide8.addText("Product Roadmap", {
  x: 0.5, y: 0.3, w: 9, h: 0.7,
  fontSize: 36, fontFace: "Arial Black",
  color: THEME.white, bold: true
});

// Timeline
const milestones = [
  { q: "Q1 2026", title: "平台发布", items: ["核心 AI 功能", "Web 应用", "API v1"] },
  { q: "Q2 2026", title: "生态扩展", items: ["插件市场", "移动应用", "API v2"] },
  { q: "Q3 2026", title: "企业增强", items: ["私有部署", "高级安全", "审计日志"] },
  { q: "Q4 2026", title: "智能化升级", items: ["自学习模型", "预测分析", "行业方案"] }
];

// Timeline line
slide8.addShape(pres.shapes.LINE, {
  x: 1.5, y: 2.0, w: 7, h: 0,
  line: { color: THEME.electricBlue, width: 3 }
});

milestones.forEach((m, i) => {
  const xPos = 1.5 + i * 2.3;

  // Circle on timeline
  slide8.addShape(pres.shapes.OVAL, {
    x: xPos - 0.15, y: 1.85, w: 0.3, h: 0.3,
    fill: { color: THEME.neonCyan }
  });

  // Quarter
  slide8.addText(m.q, {
    x: xPos - 0.5, y: 2.3, w: 1, h: 0.3,
    fontSize: 12, fontFace: "Arial",
    color: THEME.neonCyan, bold: true, align: "center"
  });

  // Title
  slide8.addText(m.title, {
    x: xPos - 0.7, y: 2.7, w: 1.4, h: 0.4,
    fontSize: 14, fontFace: "Arial",
    color: THEME.white, bold: true, align: "center"
  });

  // Items
  m.items.forEach((item, ii) => {
    slide8.addText("• " + item, {
      x: xPos - 0.7, y: 3.2 + ii * 0.35, w: 1.4, h: 0.35,
      fontSize: 10, fontFace: "Arial",
      color: THEME.white, align: "center"
    });
  });
});

// ========== Slide 9: Call to Action ==========
let slide9 = pres.addSlide();
slide9.background = { color: THEME.darkGray };

// Decorative elements
slide9.addShape(pres.shapes.OVAL, {
  x: -0.5, y: -0.5, w: 3, h: 3,
  fill: { color: THEME.electricBlue, transparency: 80 }
});
slide9.addShape(pres.shapes.OVAL, {
  x: 8, y: 4, w: 2.5, h: 2.5,
  fill: { color: THEME.neonCyan, transparency: 80 }
});

slide9.addText("Ready to Transform\nYour Business?", {
  x: 0.5, y: 1.5, w: 9, h: 1.5,
  fontSize: 48, fontFace: "Arial Black",
  color: THEME.white, bold: true, align: "center"
});

// CTA Button
slide9.addShape(pres.shapes.RECTANGLE, {
  x: 3.5, y: 3.3, w: 3, h: 0.8,
  fill: { color: THEME.electricBlue }
});
slide9.addText("Start Free Trial", {
  x: 3.5, y: 3.3, w: 3, h: 0.8,
  fontSize: 18, fontFace: "Arial",
  color: THEME.white, bold: true, align: "center", valign: "middle"
});

slide9.addText("14 天免费试用 • 无需信用卡 • 随时取消", {
  x: 0.5, y: 4.3, w: 9, h: 0.4,
  fontSize: 14, fontFace: "Arial",
  color: THEME.white, align: "center"
});

slide9.addText("www.nexusai.com | contact@nexusai.com", {
  x: 0.5, y: 5.0, w: 9, h: 0.3,
  fontSize: 12, fontFace: "Arial",
  color: THEME.neonCyan, align: "center"
});

// ========== Slide 10: Thank You / Q&A ==========
let slide10 = pres.addSlide();
slide10.background = { color: THEME.darkGray };

// Decorative circles
slide10.addShape(pres.shapes.OVAL, {
  x: 7.5, y: -1, w: 4, h: 4,
  fill: { color: THEME.electricBlue, transparency: 85 }
});
slide10.addShape(pres.shapes.OVAL, {
  x: -1, y: 3.5, w: 3, h: 3,
  fill: { color: THEME.neonCyan, transparency: 90 }
});

// Main text
slide10.addText("Thank You", {
  x: 0.5, y: 1.8, w: 9, h: 1,
  fontSize: 64, fontFace: "Arial Black",
  color: THEME.white, bold: true, align: "center"
});

// Subtitle
slide10.addText("Questions & Answers", {
  x: 0.5, y: 2.9, w: 9, h: 0.6,
  fontSize: 28, fontFace: "Arial",
  color: THEME.neonCyan, align: "center"
});

// Contact info
slide10.addText("联系我们", {
  x: 3.5, y: 3.8, w: 3, h: 0.4,
  fontSize: 16, fontFace: "Arial",
  color: THEME.white, bold: true, align: "center"
});

slide10.addText("📧 contact@nexusai.com", {
  x: 3.5, y: 4.3, w: 3, h: 0.3,
  fontSize: 12, fontFace: "Arial",
  color: THEME.white, align: "center"
});

slide10.addText("🌐 www.nexusai.com", {
  x: 3.5, y: 4.6, w: 3, h: 0.3,
  fontSize: 12, fontFace: "Arial",
  color: THEME.white, align: "center"
});

slide10.addText("📱 @NexusAI", {
  x: 3.5, y: 4.9, w: 3, h: 0.3,
  fontSize: 12, fontFace: "Arial",
  color: THEME.white, align: "center"
});

// Save the presentation
pres.writeFile({ fileName: "NexusAI_Product_Launch.pptx" })
  .then(() => console.log("✅ Presentation created: NexusAI_Product_Launch.pptx"))
  .catch(err => console.error("Error:", err));
