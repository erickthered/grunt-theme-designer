$(document).ready(function() {
    $('#btn-size').change(function(e) {
        var sizes = ['btn-block', 'btn-xl', 'btn-lg', 'btn-md', 'btn-sm', 'btn-xs'];
        for(var i=0; i<sizes.length; i++) {
            $('.btn').removeClass(sizes[i]);
        }
        $('.btn').addClass($('#btn-size').val());
    });

    $('#header-style').change(function(e) {
        var styles = ['h-default', 'h-primary', 'h-info', 'h-success', 'h-warning', 'h-danger'];
        for(var i=0; i<styles.length; i++) {
            $('h1').removeClass(styles[i]);
            $('h2').removeClass(styles[i]);
            $('h3').removeClass(styles[i]);
            $('h4').removeClass(styles[i]);
            $('h5').removeClass(styles[i]);
            $('h6').removeClass(styles[i]);
        }
        if ($('#header-style').val() !== '') {
            $('h1').addClass($('#header-style').val());
            $('h2').addClass($('#header-style').val());
            $('h3').addClass($('#header-style').val());
            $('h4').addClass($('#header-style').val());
            $('h5').addClass($('#header-style').val());
            $('h6').addClass($('#header-style').val());
        }
    });

    $('#navbar-style').change(function(e) {
        var styles = ['navbar-inverse', 'navbar-default', 'navbar-primary', 'navbar-info', 'navbar-success', 'navbar-warning', 'navbar-danger'];
        for(var i=0; i<styles.length; i++) {
            $('nav').removeClass(styles[i]);
        }
        $('nav').addClass($('#navbar-style').val());        
    });

    $('#btn-style').change(function(e) {
        if ($(this).val() === '') {
            $('.btn-default-outline').addClass('btn-default').removeClass('btn-default-outline');
            $('.btn-primary-outline').addClass('btn-primary').removeClass('btn-primary-outline');
            $('.btn-info-outline').addClass('btn-info').removeClass('btn-info-outline');
            $('.btn-success-outline').addClass('btn-success').removeClass('btn-success-outline');
            $('.btn-warning-outline').addClass('btn-warning').removeClass('btn-warning-outline');
            $('.btn-danger-outline').addClass('btn-danger').removeClass('btn-danger-outline');
        }
        if ($(this).val() === 'outlined') {
            $('.btn-default').addClass('btn-default-outline').removeClass('btn-default');
            $('.btn-primary').addClass('btn-primary-outline').removeClass('btn-primary');
            $('.btn-info').addClass('btn-info-outline').removeClass('btn-info');
            $('.btn-success').addClass('btn-success-outline').removeClass('btn-success');
            $('.btn-warning').addClass('btn-warning-outline').removeClass('btn-warning');
            $('.btn-danger').addClass('btn-danger-outline').removeClass('btn-danger');
        }
    });
});