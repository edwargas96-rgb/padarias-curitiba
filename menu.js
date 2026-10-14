// Cardápio da Padarias Curitiba — edite aqui para atualizar o site.
// price: número em reais (ou null = "sob consulta"); unit: texto exibido depois do preço.
// Os itens abaixo são só o que já foi confirmado; o restante do CARDAPIO_2025.pdf entra aqui.
window.MENU = [
  {
    cat: "Doces",
    items: [
      {
        id: "doces-simples",
        name: "Doces simples",
        desc: "Brigadeiro, cajuzinho, bom casado, beijinho, olho de sogro, brigadeiro branco e bicho de pé.",
        price: 175,
        unit: "cento"
      }
    ]
  },
  {
    cat: "Bolos e tortas",
    items: [
      {
        id: "bolo-decorado",
        name: "Bolo decorado",
        desc: "Informe sabor, tamanho e tema nas observações. Valor combinado pelo WhatsApp.",
        price: null,
        unit: ""
      }
    ]
  }
];
// WhatsApp que recebe as encomendas (DDI + DDD + número, só dígitos).
window.WHATSAPP = "5541992120285";
