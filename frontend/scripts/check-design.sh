#!/bin/sh
# docs/DESIGN.md で禁止しているクラスと色指定を検出する。CI と pre-commit で使う。
cd "$(dirname "$0")/.." || exit 1

pattern='\b(rounded-(sm|md|lg|xl|2xl|3xl)|shadow-(sm|md|lg|xl|2xl)|bg-gradient-to-|blur-\[|backdrop-blur|drop-shadow)\b|\b(text|bg|border)-(gray|slate|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-[0-9]{2,3}\b|\b(text|bg|border)-\[#[0-9a-fA-F]{3,8}\]'

if grep -rEn "$pattern" src --include='*.tsx' --include='*.ts' --include='*.css'; then
  echo ""
  echo "design: 禁止クラスがあります（docs/DESIGN.md）。トークン（paper / ink / rule / mark）を使ってください。"
  exit 1
fi
echo "design: OK"
