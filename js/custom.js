(function ($) {
    var $message = $('#message');

    var $years = $('#years');
    var $months = $('#months');
    var $days = $('#days');
    var $hours = $('#hours');
    var $minutes = $('#minutes');
    var $seconds = $('#seconds');


    function CountUp(initDate, endDate) {
        this.beginDate = new Date(initDate);
        this.endDate = endDate !== null ? new Date(endDate) : null;
        this.numOfDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        this.borrowed = 0, this.years = 0, this.months = 0, this.days = 0;
        this.hours = 0, this.minutes = 0, this.seconds = 0;
        this.updateNumOfDays();
        this.updateCounter();
    }

    CountUp.prototype.updateNumOfDays = function () {
        var dateNow = this.endDate !== null ? this.endDate : new Date();
        var currYear = dateNow.getFullYear();
        if ((currYear % 4 === 0 && currYear % 100 !== 0) || currYear % 400 === 0) {
            this.numOfDays[1] = 29;
        }
        var self = this;

        if (this.endDate === null) {
            setTimeout(function () {
                self.updateNumOfDays();
            }, (new Date((currYear + 1), 1, 2) - dateNow));
        }
    };

    CountUp.prototype.datePartDiff = function (then, now, MAX) {
        var diff = now - then - this.borrowed;
        this.borrowed = 0;
        if (diff > -1)
            return diff;
        this.borrowed = 1;
        return (MAX + diff);
    };

    CountUp.prototype.calculate = function () {
        var currDate = this.endDate !== null ? this.endDate : new Date();

        var prevDate = this.beginDate;
        this.seconds = this.datePartDiff(prevDate.getSeconds(), currDate.getSeconds(), 60);
        this.minutes = this.datePartDiff(prevDate.getMinutes(), currDate.getMinutes(), 60);
        this.hours = this.datePartDiff(prevDate.getHours(), currDate.getHours(), 24);
        this.days = this.datePartDiff(prevDate.getDate(), currDate.getDate(), this.numOfDays[currDate.getMonth()]);
        this.months = this.datePartDiff(prevDate.getMonth(), currDate.getMonth(), 12);
        this.years = this.datePartDiff(prevDate.getFullYear(), currDate.getFullYear(), 0);
    };

    CountUp.prototype.addLeadingZero = function (value) {
        return value < 10 ? ("0" + value) : value;
    };

    CountUp.prototype.formatTime = function () {
        this.seconds = this.addLeadingZero(this.seconds);
        this.minutes = this.addLeadingZero(this.minutes);
        this.hours = this.addLeadingZero(this.hours);
    };

    CountUp.prototype.updateCounter = function () {
        this.calculate();
        this.formatTime();

        $years.html('<h1>' + this.years + '</h1><p>Ano' + (this.years > 1 ? 's' : ''), '</p>');
        $months.html('<h1>' + this.months + '</h1><p>Mes' + (this.months > 1 ? 'es' : ''), '</p>');
        $days.html('<h1>' + this.days + '</h1><p>Dia' + (this.days > 1 ? 's' : ''), '</p>');
        $hours.html('<h1>' + this.hours + '</h1><p>Hora' + (this.hours > 1 ? 's' : ''), '</p>');
        $minutes.html('<h1>' + this.minutes + '</h1><p>Minuto' + (this.minutes > 1 ? 's' : ''), '</p>');
        $seconds.html('<h1>' + this.seconds + '</h1><p>Segundo' + (this.seconds > 1 ? 's' : ''), '</p>');

        var self = this;
        if (this.endDate === null) {
            setTimeout(function () {
                self.updateCounter();
            }, 1000);
        }
    };

    window.onload = function () {

        $("#james").on("click", function () {
            window.location.href = "img/logo.png";
        });

        $.getJSON("data/config.json", function (e) {

            if (!e.smokes) {
                $message.html("Não");
                $message.addClass("text-success").addClass("bg-info");
                new CountUp(e.start, null);
            } else {
                $message.html("Sim!");
                $message.addClass("text-danger").addClass("bg-warning");

                new CountUp(e.start, e.end);
            }

        });
    };
})(jQuery);

/******************************************************************************************************************************
 ANIMATIONS
 *******************************************************************************************************************************/
(function ($) {
    "use strict";
    var isMobile = false;
    if (navigator.userAgent.match(/Android/i) ||
            navigator.userAgent.match(/webOS/i) ||
            navigator.userAgent.match(/iPhone/i) ||
            navigator.userAgent.match(/iPad/i) ||
            navigator.userAgent.match(/iPod/i) ||
            navigator.userAgent.match(/BlackBerry/i)) {
        isMobile = true;
    }
    if (isMobile === true) {
        $('body').removeClass('nomobile');
        $('.animated').removeClass('animated');
    }
    $(function () {
        if (isMobile === false) {
            $('*[data-animated]').addClass('animated');
        }
        function animated_contents() {
            $(".animated:appeared").each(function (i) {
                var $this = $(this), animated = $(this).data('animated');

                setTimeout(function () {
                    $this.addClass(animated);
                }, 50 * i);
            });
        }
        animated_contents();
        $(window).scroll(function () {
            animated_contents();
        });
    });
})(jQuery);
/******************************************************************************************************************************
 SLIDER
 *******************************************************************************************************************************/
(function ($) {
    "use strict";
    $("body.nomobile #slider").revolution({
        delay: 9000,
        startheight: 450,
        startwidth: 890,
        thumbWidth: 500,
        thumbHeight: 300,
        thumbAmount: 5,
        onHoverStop: "on",
        hideThumbs: 200,
        navigationType: "bullet",
        navigationStyle: "round",
        navigationArrows: "none",
        touchenabled: "on",
        navOffsetHorizontal: 0,
        navOffsetVertical: 80,
        shadow: undefined,
        fullWidth: "on",
        fullScreen: "on"
    });
})(jQuery);
/******************************************************************************************************************************
 BOOTSTRAP
 *******************************************************************************************************************************/
(function ($) {
    "use strict";
    $('[data-rel=tooltip]').tooltip();
    $(".alert").alert();
})(jQuery);
/******************************************************************************************************************************
 PROGRESS BAR
 *******************************************************************************************************************************/
(function ($) {
    "use strict";
    $("a.btn-progress").click(function () {
        $('#bar-container').slideToggle();
    });
})(jQuery);
