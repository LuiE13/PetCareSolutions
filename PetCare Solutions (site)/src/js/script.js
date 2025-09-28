$(document).ready(function() {
    $('#btn-mobile').on('click', function () {
        $('#mobileMenu').toggleClass('active');
        $('#btn-mobile').find('i').toggleClass('fa-x');

        const but = $('#butMenu');
        const isMenuOpen = $('#mobileMenu').hasClass('active');

        if (isMenuOpen) {
            // Mudar para ícone de fechar
            but.attr('src', 'img/icones/icons8-excluir-48.png'); // Certifique-se da extensão correta
            but.attr('alt', 'Fechar menu');
        } else {
            // Voltar para ícone de menu
            but.attr('src', 'img/icones/icons8-cardápio-48.png');
            but.attr('alt', 'Abrir menu');
        }
    });
});