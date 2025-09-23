$(document).ready(function() {
    
    // Set the initial screen to the profile selection page
    $('#profile-select-screen').removeClass('hidden-screen').css('opacity', 1);

    // Function to handle screen transitions (Fade Out/In)
    function showScreen(screenId) {
        $('.p5-container:not(.hidden-screen)').fadeOut(500, function() {
            $('.p5-container').addClass('hidden-screen').css('opacity', 0);
            
            var $newScreen = $('#' + screenId);
            
            if (screenId === 'portfolio-screen') {
                $newScreen.removeClass('hidden-screen').css('display', 'block').animate({ opacity: 1 }, 500);
            } else {
                $newScreen.removeClass('hidden-screen').css('display', 'flex').animate({ opacity: 1 }, 500);
            }
        });
    }
    
    // Click Profile Avatar to go to a Portfolio
    $('.profile-box').on('click', function() {
        var profile = $(this).data('profile');
        
        $('.portfolio-content-wrapper').addClass('hidden-content');
        $('#' + profile + '-portfolio').removeClass('hidden-content');
        
        showScreen('portfolio-screen');
        $('#portfolio-screen').scrollTop(0);
    });

    // Handle return to profiles from the navbar
    $('#return-to-profiles').on('click', function(e) {
        e.preventDefault();
        showScreen('profile-select-screen'); 
    });
    
    // Smooth Scroll for Navbar
    $('#navbar-portfolio a:not(#return-to-profiles)').on('click', function(e) {
        e.preventDefault();
        
        // Get the ID of the currently active portfolio
        var activePortfolioId = $('.portfolio-content-wrapper:visible').attr('id');
        
        // Get the target section ID from the clicked link (e.g., '#about')
        var targetHash = $(this).attr('href');
        
        // Find the target element within the active portfolio section
        var targetElement = $('#' + activePortfolioId + ' ' + targetHash);
        
        if (targetElement.length) {
            // Calculate the position relative to the scrollable container
            var navHeight = $('#navbar-portfolio').outerHeight();
            var targetPosition = targetElement.offset().top + $('#portfolio-screen').scrollTop() - navHeight;

            $('#portfolio-screen').animate({
                scrollTop: targetPosition
            }, 500);
        }
    });
});