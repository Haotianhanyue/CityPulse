/**
 * CityPulse Test Harness - 测试运行器
 * 用于验证 HTML 原型的设计系统合规性、响应式设计和可访问性
 * 
 * Usage: node run-tests.js [--suite <name>]
 */

const fs = require('fs');
const path = require('path');

// ============================================================
// Configuration
// ============================================================
const HTML_FILE = path.resolve(__dirname, '..', 'Untitled-1.html');

const DESIGN_TOKENS = {
  colors: {
    primary: '#ab3500',
    'primary-container': '#ff6b35',
    secondary: '#24619d',
    'secondary-container': '#87bcfe',
    surface: '#f9f9f9',
    'on-surface': '#1a1c1c',
    background: '#f9f9f9',
  },
  fonts: {
    headline: 'Plus Jakarta Sans',
    body: 'Inter',
  },
  spacing: {
    xs: '4px', sm: '8px', md: '16px', lg: '24px', xl: '32px', '2xl': '48px',
  },
};

const REQUIRED_SECTIONS = [
  { name: '路线详情-桌面', marker: '路线详情 - CityPulse' },
  { name: '个人中心-桌面', marker: '个人中心 - CityPulse' },
  { name: '个人中心-移动端', marker: '个人中心 - 移动端' },
  { name: '社区动态-桌面', marker: '社区动态 - CityPulse' },
  { name: '社区动态-移动端', marker: '社区动态 - 移动端' },
  { name: '路线详情-移动端', marker: '路线详情 - 移动端' },
  { name: '探索大厅', marker: '探索大厅 - CityPulse' },
];

// ============================================================
// Test Runner
// ============================================================
class TestHarness {
  constructor() {
    this.results = { passed: 0, failed: 0, warnings: 0, details: [] };
    this.html = '';
    this.suites = {};
  }

  loadHTML() {
    try {
      this.html = fs.readFileSync(HTML_FILE, 'utf-8');
      console.log(`[INFO] Loaded HTML file: ${HTML_FILE} (${this.html.length} chars)`);
      return true;
    } catch (err) {
      console.error(`[ERROR] Cannot load HTML file: ${err.message}`);
      return false;
    }
  }

  // --- Test Utilities ---
  pass(name, message = '') {
    this.results.passed++;
    this.results.details.push({ status: 'PASS', name, message });
    console.log(`  ✅ PASS: ${name}${message ? ' - ' + message : ''}`);
  }

  fail(name, message = '') {
    this.results.failed++;
    this.results.details.push({ status: 'FAIL', name, message });
    console.log(`  ❌ FAIL: ${name}${message ? ' - ' + message : ''}`);
  }

  warn(name, message = '') {
    this.results.warnings++;
    this.results.details.push({ status: 'WARN', name, message });
    console.log(`  ⚠️  WARN: ${name}${message ? ' - ' + message : ''}`);
  }

  // ============================================================
  // Test Suite: Design System
  // ============================================================
  testDesignSystem() {
    console.log('\n📐 Suite: Design System Compliance\n');

    // Test: Primary colors exist
    const hasPrimaryColor = this.html.includes('#ab3500');
    hasPrimaryColor
      ? this.pass('primary-color', 'Found #ab3500')
      : this.fail('primary-color', 'Missing primary color #ab3500');

    // Test: Primary container color
    const hasPrimaryContainer = this.html.includes('#ff6b35');
    hasPrimaryContainer
      ? this.pass('primary-container-color', 'Found #ff6b35')
      : this.fail('primary-container-color', 'Missing primary container #ff6b35');

    // Test: Secondary color
    const hasSecondaryColor = this.html.includes('#24619d');
    hasSecondaryColor
      ? this.pass('secondary-color', 'Found #24619d')
      : this.fail('secondary-color', 'Missing secondary color #24619d');

    // Test: Font families loaded
    const hasJakartaFont = this.html.includes('Plus+Jakarta+Sans') || this.html.includes('Plus Jakarta Sans');
    hasJakartaFont
      ? this.pass('headline-font', 'Plus Jakarta Sans loaded')
      : this.fail('headline-font', 'Plus Jakarta Sans not found');

    const hasInterFont = this.html.includes('Inter');
    hasInterFont
      ? this.pass('body-font', 'Inter font loaded')
      : this.fail('body-font', 'Inter font not found');

    // Test: Material Symbols loaded
    const hasMaterialIcons = this.html.includes('Material+Symbols+Outlined') || this.html.includes('Material Symbols');
    hasMaterialIcons
      ? this.pass('material-icons', 'Material Symbols Outlined loaded')
      : this.fail('material-icons', 'Material Symbols not found');

    // Test: Tailwind CDN
    const hasTailwind = this.html.includes('cdn.tailwindcss.com');
    hasTailwind
      ? this.pass('tailwind-cdn', 'Tailwind CSS CDN found')
      : this.fail('tailwind-cdn', 'Tailwind CSS CDN missing');

    // Test: Design token consistency (check all pages use same primary)
    const primaryOccurrences = (this.html.match(/#ab3500/g) || []).length;
    primaryOccurrences >= 7
      ? this.pass('design-token-consistency', `Primary color used ${primaryOccurrences} times across pages`)
      : this.warn('design-token-consistency', `Primary color only used ${primaryOccurrences} times, expected 7+`);

    // Test: Spacing tokens used
    const spacingTokens = ['spacing', 'margin-mobile', 'margin-desktop'];
    const hasSpacingTokens = spacingTokens.some(t => this.html.includes(t));
    hasSpacingTokens
      ? this.pass('spacing-tokens', 'Custom spacing tokens found in config')
      : this.fail('spacing-tokens', 'No custom spacing tokens found');
  }

  // ============================================================
  // Test Suite: Page Structure
  // ============================================================
  testPageStructure() {
    console.log('\n📄 Suite: Page Structure\n');

    // Test: All required sections exist
    for (const section of REQUIRED_SECTIONS) {
      const found = this.html.includes(section.marker);
      found
        ? this.pass(`section-${section.name}`, `Found "${section.marker}"`)
        : this.fail(`section-${section.name}`, `Missing section "${section.marker}"`);
    }

    // Test: Multiple DOCTYPE declarations (multi-page file)
    const doctypeCount = (this.html.match(/<!DOCTYPE html>/gi) || []).length;
    doctypeCount >= 7
      ? this.pass('page-count', `Found ${doctypeCount} pages in single HTML file`)
      : this.warn('page-count', `Expected 7+ pages, found ${doctypeCount}`);

    // Test: Lang attribute
    const hasLangAttr = this.html.includes('lang="zh-CN"');
    hasLangAttr
      ? this.pass('lang-attribute', 'Chinese language attribute set')
      : this.fail('lang-attribute', 'Missing lang="zh-CN"');

    // Test: Viewport meta
    const hasViewport = this.html.includes('width=device-width');
    hasViewport
      ? this.pass('viewport-meta', 'Viewport meta tag found')
      : this.fail('viewport-meta', 'Missing viewport meta tag');
  }

  // ============================================================
  // Test Suite: Responsive Design
  // ============================================================
  testResponsiveDesign() {
    console.log('\n📱 Suite: Responsive Design\n');

    // Test: Mobile bottom nav present
    const hasBottomNav = this.html.includes('fixed bottom-0');
    hasBottomNav
      ? this.pass('bottom-nav', 'Fixed bottom navigation found')
      : this.fail('bottom-nav', 'Missing bottom navigation');

    // Test: Bottom nav hidden on desktop
    const hasMobileOnly = this.html.includes('md:hidden');
    hasMobileOnly
      ? this.pass('mobile-only-elements', 'md:hidden responsive class used')
      : this.fail('mobile-only-elements', 'No mobile-only responsive classes found');

    // Test: Desktop sidebar
    const hasDesktopSidebar = this.html.includes('hidden md:flex');
    hasDesktopSidebar
      ? this.pass('desktop-sidebar', 'Desktop sidebar with hidden md:flex found')
      : this.fail('desktop-sidebar', 'Missing desktop sidebar pattern');

    // Test: Responsive padding
    const hasResponsivePadding = this.html.includes('px-margin-mobile') && this.html.includes('px-margin-desktop');
    hasResponsivePadding
      ? this.pass('responsive-padding', 'Responsive margin tokens used')
      : this.fail('responsive-padding', 'Missing responsive margin tokens');

    // Test: Responsive grid
    const hasResponsiveGrid = this.html.includes('lg:grid-cols-12') || this.html.includes('md:grid-cols');
    hasResponsiveGrid
      ? this.pass('responsive-grid', 'Responsive grid layout found')
      : this.warn('responsive-grid', 'No responsive grid found');

    // Test: Bottom nav has 4 items
    const bottomNavMatches = this.html.match(/bottom-0[^]*?<\/nav>/g) || [];
    let hasFourItems = false;
    for (const nav of bottomNavMatches) {
      const itemCount = (nav.match(/flex flex-col items-center/g) || []).length;
      if (itemCount === 4) { hasFourItems = true; break; }
    }
    hasFourItems
      ? this.pass('bottom-nav-4-items', 'Bottom nav has 4 items (Map/Feed/Routes/Me)')
      : this.warn('bottom-nav-4-items', 'Bottom nav may not have exactly 4 items');
  }

  // ============================================================
  // Test Suite: Accessibility
  // ============================================================
  testAccessibility() {
    console.log('\n♿ Suite: Accessibility\n');

    // Test: Images have alt attributes
    const imgTags = this.html.match(/<img[^>]*>/g) || [];
    let imagesWithoutAlt = 0;
    let imagesWithDataAlt = 0;
    for (const img of imgTags) {
      if (!img.includes('alt=') && !img.includes('data-alt=')) {
        imagesWithoutAlt++;
      }
      if (img.includes('data-alt=')) {
        imagesWithDataAlt++;
      }
    }
    imagesWithoutAlt === 0
      ? this.pass('img-alt', `All ${imgTags.length} images have alt or data-alt attributes`)
      : this.fail('img-alt', `${imagesWithoutAlt}/${imgTags.length} images missing alt attributes`);

    if (imagesWithDataAlt > 0) {
      this.warn('data-alt-usage', `${imagesWithDataAlt} images use data-alt instead of alt (non-standard)`);
    }

    // Test: Form inputs have labels/placeholders
    const inputs = this.html.match(/<input[^>]*>/g) || [];
    let inputsWithoutLabel = 0;
    for (const input of inputs) {
      if (!input.includes('placeholder=') && !input.includes('aria-label=')) {
        inputsWithoutLabel++;
      }
    }
    inputsWithoutLabel === 0
      ? this.pass('input-labels', 'All inputs have placeholder or aria-label')
      : this.warn('input-labels', `${inputsWithoutLabel} inputs missing labels`);

    // Test: Buttons have content
    const emptyButtons = (this.html.match(/<button[^>]*>\s*<\/button>/g) || []).length;
    emptyButtons === 0
      ? this.pass('button-content', 'No empty buttons found')
      : this.warn('button-content', `${emptyButtons} potentially empty buttons`);

    // Test: Semantic HTML
    const hasSemantic = ['<header', '<main', '<nav', '<section', '<article', '<aside']
      .filter(tag => this.html.includes(tag));
    hasSemantic.length >= 4
      ? this.pass('semantic-html', `Uses ${hasSemantic.length} semantic HTML elements`)
      : this.warn('semantic-html', `Only ${hasSemantic.length} semantic elements found`);

    // Test: Focus states
    const hasFocusStates = this.html.includes('focus:ring') || this.html.includes('focus:border');
    hasFocusStates
      ? this.pass('focus-states', 'Focus ring/border states found')
      : this.warn('focus-states', 'No explicit focus states found');
  }

  // ============================================================
  // Test Suite: Interactions
  // ============================================================
  testInteractions() {
    console.log('\n🎯 Suite: Interactions\n');

    // Test: JavaScript exists
    const scriptTags = this.html.match(/<script>[\s\S]*?<\/script>/g) || [];
    scriptTags.length > 0
      ? this.pass('javascript-present', `Found ${scriptTags.length} script blocks`)
      : this.fail('javascript-present', 'No JavaScript found');

    // Test: Event listeners
    const hasEventListeners = this.html.includes('addEventListener');
    hasEventListeners
      ? this.pass('event-listeners', 'Event listeners found')
      : this.fail('event-listeners', 'No event listeners found');

    // Test: Bottom sheet interaction
    const hasBottomSheet = this.html.includes('bottom-sheet') || this.html.includes('Bottom Sheet');
    hasBottomSheet
      ? this.pass('bottom-sheet', 'Bottom sheet component found')
      : this.warn('bottom-sheet', 'No bottom sheet component found');

    // Test: Scroll interactions
    const hasScrollHandler = this.html.includes("window.addEventListener('scroll'") || this.html.includes('scroll');
    hasScrollHandler
      ? this.pass('scroll-interaction', 'Scroll event handler found')
      : this.warn('scroll-interaction', 'No scroll interaction found');

    // Test: Hover transitions
    const hoverCount = (this.html.match(/hover:/g) || []).length;
    hoverCount > 10
      ? this.pass('hover-transitions', `Found ${hoverCount} hover state classes`)
      : this.warn('hover-transitions', `Only ${hoverCount} hover states found`);

    // Test: Active states (scale)
    const activeCount = (this.html.match(/active:scale/g) || []).length;
    activeCount > 5
      ? this.pass('active-states', `Found ${activeCount} active:scale micro-interactions`)
      : this.warn('active-states', `Only ${activeCount} active states found`);

    // Test: Transition classes
    const transitionCount = (this.html.match(/transition-/g) || []).length;
    transitionCount > 10
      ? this.pass('transitions', `Found ${transitionCount} transition classes`)
      : this.warn('transitions', `Only ${transitionCount} transitions found`);

    // Test: Animation keyframes
    const hasKeyframes = this.html.includes('@keyframes');
    hasKeyframes
      ? this.pass('css-animations', 'CSS @keyframes animations found')
      : this.warn('css-animations', 'No CSS keyframe animations found');
  }

  // ============================================================
  // Run All Tests
  // ============================================================
  run(suiteName = null) {
    console.log('═══════════════════════════════════════════');
    console.log('  CityPulse Test Harness v1.0');
    console.log('═══════════════════════════════════════════');

    if (!this.loadHTML()) {
      console.log('\n[FATAL] Cannot proceed without HTML file.');
      process.exit(1);
    }

    const suites = {
      'design-system': () => this.testDesignSystem(),
      'page-structure': () => this.testPageStructure(),
      'responsive': () => this.testResponsiveDesign(),
      'accessibility': () => this.testAccessibility(),
      'interactions': () => this.testInteractions(),
    };

    if (suiteName) {
      if (suites[suiteName]) {
        suites[suiteName]();
      } else {
        console.error(`\n[ERROR] Unknown suite: "${suiteName}"`);
        console.log(`Available suites: ${Object.keys(suites).join(', ')}`);
        process.exit(1);
      }
    } else {
      Object.values(suites).forEach(fn => fn());
    }

    // Summary
    console.log('\n═══════════════════════════════════════════');
    console.log(`  Results: ${this.results.passed} passed, ${this.results.failed} failed, ${this.results.warnings} warnings`);
    console.log('═══════════════════════════════════════════\n');

    // Generate report
    this.generateReport();

    return this.results.failed === 0;
  }

  generateReport() {
    const report = {
      timestamp: new Date().toISOString(),
      file: HTML_FILE,
      summary: {
        passed: this.results.passed,
        failed: this.results.failed,
        warnings: this.results.warnings,
        total: this.results.passed + this.results.failed + this.results.warnings,
      },
      details: this.results.details,
    };

    const reportPath = path.resolve(__dirname, 'test-report.json');
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2), 'utf-8');
    console.log(`[INFO] Report saved to: ${reportPath}`);
  }
}

// ============================================================
// CLI Entry Point
// ============================================================
const args = process.argv.slice(2);
let suiteName = null;

const suiteIndex = args.indexOf('--suite');
if (suiteIndex !== -1 && args[suiteIndex + 1]) {
  suiteName = args[suiteIndex + 1];
}

const harness = new TestHarness();
const success = harness.run(suiteName);
process.exit(success ? 0 : 1);
