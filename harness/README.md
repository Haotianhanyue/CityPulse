# CityPulse 测试 Harness 配置

## 概述
本 harness 工具用于验证 CityPulse HTML 原型的设计系统合规性、响应式设计、可访问性和交互功能。

## 使用方法

运行测试:
```bash
node harness/run-tests.js
```

运行单个测试套件:
```bash
node harness/run-tests.js --suite design-system
node harness/run-tests.js --suite responsive
node harness/run-tests.js --suite accessibility
node harness/run-tests.js --suite interactions
```

## 测试套件

### 1. design-system - 设计系统合规性
### 2. responsive - 响应式设计
### 3. accessibility - 可访问性
### 4. interactions - 交互功能
