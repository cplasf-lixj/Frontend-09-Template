学习笔记

#一、AST
  ##AST叫做抽象语法树

#二、语法分析算法
  ##1、LL算法：Left Left算法，从左到右扫描、规约
  ##2、LR算法：Left Right算法

#三、四则运算
  ##词法
    ###1、TokenNumber
      1 2 3 4 5 6 7 8 9 0的组合
    ###2、Operator
      + - * / 四个之一
    ###3、Whitespace:
      <SP>
    ###4、LineTerminator:
      <LF> <CR>
  ##语法

    LL语法分析
    <AdditiveExpression> ::=
      <MultiplicationExpression>
      |<AdditiveExpression><+><MultiplicationExpression>
      |<AdditiveExpression><-><MultiplicationExpression>
    -->
    <AdditiveExpress> ::=
      <Number>
      |<MultiplicationExpression><*><Number>
      |<MultiplicationExpression></><Number>
      |<AdditiveExpression><+><MultiplicationExpression>
      |<AdditiveExpression><-><MultiplicationExpression>
