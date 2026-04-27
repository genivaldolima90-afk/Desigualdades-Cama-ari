// Dados de exemplo - SUBSTITUA pelos seus dados reais!
const data = {
    poloIndustrial: {
        empresas: ['Braskem', 'Ford', 'Outras'],
        faturamento: [25000, 15000, 12000] // em milhões
    },
    turismo: {
        meses: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
        receita: [20, 18, 15, 12, 10, 12, 25, 28, 22, 18, 15, 20]
    },
    desigualdade: {
        grupos: ['Brancos', 'Negros/Pardos'],
        rendaMedia: [2500, 1800],
        pobreza: [25, 68]
    }
};

document.addEventListener('DOMContentLoaded', function() {
    // Gráfico Polo Industrial
    const poloCtx = document.getElementById('poloChart').getContext('2d');
    new Chart(poloCtx, {
        type: 'doughnut',
        data: {
            labels: data.poloIndustrial.empresas,
            datasets: [{
                data: data.poloIndustrial.faturamento,
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
            }]
        },
        options: {
            responsive: true,
            plugins: {
                title: { display: true, text: 'Distribuição Faturamento Polo (R$ milhões)' }
            }
        }
    });

    // Gráfico Turismo
    const turismoCtx = document.getElementById('turismoChart').getContext('2d');
    new Chart(turismoCtx, {
        type: 'line',
        data: {
            labels: data.turismo.meses,
            datasets: [{
                label: 'Receita Hotéis (R$ milhões)',
                data: data.turismo.receita,
                borderColor: '#36A2EB',
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                tension: 0.4
            }]
        },
        options: { responsive: true }
    });

    // Gráficos Desigualdade
    const desigualdadeCtx = document.getElementById('desigualdadeChart').getContext('2d');
    new Chart(desigualdadeCtx, {
        type: 'bar',
        data: {
            labels: data.desigualdade.grupos,
            datasets: [{
                label: '% em Pobreza',
                data: data.desigualdade.pobreza,
                backgroundColor: ['#36A2EB', '#FF6384']
            }]
        },
        options: { responsive: true, scales: { y: { beginAtZero: true } } }
    });

    const rendaCtx = document.getElementById('rendaChart').getContext('2d');
    new Chart(rendaCtx, {
        type: 'bar',
        data: {
            labels: data.desigualdade.grupos,
            datasets: [{
                label: 'Renda Média (R$)',
                data: data.desigualdade.rendaMedia,
                backgroundColor: ['#4BC0C0', '#FF9F40']
            }]
        },
        options: { responsive: true, scales: { y: { beginAtZero: true } } }
    });

    // Mapa Interativo
    const map = L.map('map').setView([-12.6986, -38.3261], 12);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
    
    // Marcadores exemplo - adicione seus dados reais
    L.marker([-12.6986, -38.3261]).addTo(map)
        .bindPopup('Polo Industrial<br>Riqueza concentrada');
    L.marker([-12.75, -38.25]).addTo(map)
        .bindPopup('Praia de Itacimirim<br>Turismo vs informalidade');
});

// Funções interativas
function shareData() {
    if (navigator.share) {
        navigator.share({
            title: 'Engrenagens da Desigualdade - Camaçari',
            text: 'Veja como a riqueza do Polo e turismo não chega à população!',
            url: window.location.href
        });
    } else {
        alert('Copie o link e compartilhe: ' + window.location.href);
    }
}

function openDebate() {
    window.open('https://wa.me/?text=Veja%20os%20dados%20da%20desigualdade%20em%20Camaçari:%20' + window.location.href, '_blank');
}
