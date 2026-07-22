#!/bin/bash
# Script para atualizar cores automaticamente no theme.css
# Uso: ./UPDATE_CORES_AUTOMATICO.sh "#1A1A1A" "#D4A574" "#C97A5C" etc

echo "🎨 Atualizando Paleta de Cores..."

# Cores fornecidas como argumentos
COLOR_PRIMARY="${1:-#1a1a1a}"
COLOR_SECONDARY="${2:-#D4A574}"
COLOR_ACCENT_WARM="${3:-#c85d5d}"
COLOR_ACCENT_COOL="${4:-#7a9b8e}"
COLOR_ACCENT_GOLD="${5:-#c9a961}"

# Arquivo a atualizar
THEME_FILE="css/theme.css"

echo "Cores a aplicar:"
echo "  Primária: $COLOR_PRIMARY"
echo "  Secundária: $COLOR_SECONDARY"
echo "  Acento Quente: $COLOR_ACCENT_WARM"
echo "  Acento Frio: $COLOR_ACCENT_COOL"
echo "  Acento Ouro: $COLOR_ACCENT_GOLD"

# Fazer backup
cp $THEME_FILE ${THEME_FILE}.backup
echo "✅ Backup criado: ${THEME_FILE}.backup"

# Atualizar cores usando sed
sed -i '' "s/--color-primary: .*/--color-primary: $COLOR_PRIMARY;/" $THEME_FILE
sed -i '' "s/--color-secondary: .*/--color-secondary: $COLOR_SECONDARY;/" $THEME_FILE
sed -i '' "s/--color-accent-warm: .*/--color-accent-warm: $COLOR_ACCENT_WARM;/" $THEME_FILE
sed -i '' "s/--color-accent-cool: .*/--color-accent-cool: $COLOR_ACCENT_COOL;/" $THEME_FILE
sed -i '' "s/--color-accent-gold: .*/--color-accent-gold: $COLOR_ACCENT_GOLD;/" $THEME_FILE

echo "✅ Cores atualizadas com sucesso!"
echo "Recarregue a página no navegador para ver as mudanças."
