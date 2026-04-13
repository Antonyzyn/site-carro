/ 1. SISTEMA DE FILTROS DO CATÁLOGO
const filterButtons = document.querySelectorAll('.filter-btn');
const carros = document.querySelectorAll('.card-carro');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove a classe ativa de todos os botões e adiciona no clicado
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        // Pega a categoria selecionada (ex: 'suvs', 'sedans')
        const filterValue = button.getAttribute('data-filter');

        // Mostra ou esconde os carros baseado no filtro
        carros.forEach(carro => {
            if (filterValue === 'todos' || carro.getAttribute('data-categoria') === filterValue) {
                carro.style.display = 'block';
            } else {
                carro.style.display = 'none';
            }
        });
    });
});

// 2. SISTEMA DO MODAL E WHATSAPP
const modal = document.getElementById('modalVisita');
const closeBtn = document.querySelector('.close-btn');
const btnsAgendar = document.querySelectorAll('.btn-agendar');
const carroTxt = document.getElementById('carroSelecionadoTxt');
const btnWhatsApp = document.getElementById('btnWhatsApp');

let carroSelecionado = "";

// Abrir modal ao clicar em "Agendar Visita"
btnsAgendar.forEach(btn => {
    btn.addEventListener('click', (evento) => {
        // Pega o nome do carro do card específico que foi clicado
        const card = evento.target.closest('.card-carro');
        carroSelecionado = card.querySelector('.nome-carro').innerText;
        
        carroTxt.innerText = "Veículo: " + carroSelecionado;
        modal.style.display = 'flex'; // Mostra o modal
    });
});

// Fechar modal no "X" ou clicando fora dele
closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
});
window.addEventListener('click', (evento) => {
    if (evento.target === modal) {
        modal.style.display = 'none';
    }
});

// Enviar mensagem pro WhatsApp
btnWhatsApp.addEventListener('click', () => {
    const nome = document.getElementById('clienteNome').value;
    
    if (nome === "") {
        alert("Por favor, preencha seu nome antes de enviar!");
        return;
    }

    // Número do WhatsApp da loja (coloque o seu aqui, com DDI + DDD)
    const numeroLoja = "5511999999999"; 
    
    // Cria a mensagem personalizada
    const mensagem = `Olá! Meu nome é ${nome}. Gostaria de agendar uma visita para conhecer o modelo ${carroSelecionado}.`;
    
    // Converte a mensagem para formato de link
    const url = `https://wa.me/${numeroLoja}?text=${encodeURIComponent(mensagem)}`;
    
    // Abre o WhatsApp em uma nova aba
    window.open(url, '_blank');
});


