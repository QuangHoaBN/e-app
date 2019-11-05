jQuery(document).ready(function ($) {
    //E-Receipt page
    $('.content_e-receipt #quantity').keypress(function (event) {
        if (event.keyCode === 46 || event.keyCode === 8) {
            //do nothing
        } else {
            if (event.keyCode < 48 || event.keyCode > 57) {
                event.preventDefault();
            }
        }
    });

    var width = $(window).width();
    if (width <= 850 && width >= 600) {
        $('.display-mb').hide();
        $('.m-radio-inline #cash-payment').click(function () {
            if (this) {
                $('.display-mb').fadeIn('slow');
            }
        });
        $('.m-radio-inline #different-payment').click(function () {
            if (this) {
                $('.display-mb').fadeOut('slow');
            }
        });
    } else {
        $('#info-payment').hide();
        $('.m-radio-inline #cash-payment').click(function () {
            if (this) {
                $('#info-payment').fadeIn('slow');
            }
        });
        $('.m-radio-inline #different-payment').click(function () {
            if (this) {
                $('#info-payment').fadeOut('slow');
            }
        });
    }
    //end E-Receipt page    
    $('#groupbuyBH').on('click', function () {
        if (Number($("#BeneficiaryPersonRelationshipId").val()) === 19) {
            alert('Người được bảo hiểm có mối quan hệ với bên mua bảo hiểm là bản thân, chọn quan hệ khác ở người được bảo hiểm!');
        } else {
            $('.actionBH-button button').removeClass('active');
            $(this).addClass('active');
            $('.groupbuyBH').removeClass('hidden');
            $('.personalbuyBH').addClass('hidden');
            $('.spbt_bmbh').addClass('hidden');
        }
    });
    $('#personalbuyBH').on('click', function () {
        const BeneficiaryPersonRelationship = Number($("#BeneficiaryPersonRelationshipId").val());
        if (BeneficiaryPersonRelationship === 19) {
            alert('Người được bảo hiểm có mối quan hệ với bên mua bảo hiểm là bản thân, chọn quan hệ khác ở người được bảo hiểm!');
        } else if (BeneficiaryPersonRelationship === 16) {
            alert('Người được bảo hiểm có mối quan hệ với bên mua bảo hiểm là nhân viên, chọn quan hệ khác ở người được bảo hiểm!');
        } else {
            $('.actionBH-button button').removeClass('active');
            $(this).addClass('active');
            $('.personalbuyBH').removeClass('hidden');
            $('.groupbuyBH').addClass('hidden');
            $('.spbt_bmbh').removeClass('hidden');
            $(".personalbuyBH .m-portlet__body .m-portlet-disabled").removeClass('disabled');
            $(".personalbuyBH .m-portlet__body .buy-phone-row").removeClass('disabled');
            //họ và tên
            $("#BuyFullname").val('');
            //giới tính
            $("input[name='BuyGender']").filter('[value="0"]').prop('checked', false);
            $("input[name='BuyGender']").filter('[value="1"]').prop('checked', false);
            //ngày sinh và tuổi
            $("#BuyBirthDay").val('');
            $("#age2").val('');
            $("#buyAge").val('');
            //số dấy tờ tùy thân
            $("#BuyIdentityNum").val('');
            //ngày cấp
            $("#BuyIdentityDate").val('');
            //nơi cấp
            $("#BuyIdentityPlace").val('');
            //Chi tiết nghành nghề 
            $("#BuyCareerDetail").val('');
            //nơi làm việc
            $("#BuyWorkPlace").val('');
            //email
            $("#BuyEmail").val('');
            //Địa chỉ thường trú (theo sổ hộ khẩu)
            $("#BuyAndressPermanent").val('');
            //sdt
            $("#BuyPhone1").val('');
            $("#BuyPhone2").val('');
            //Mối quan hệ với Bên mua bảo hiểm
            $("#BuyPersonRelationshipId").val(1);
            $(".btn.dropdown-toggle.btn-light[data-id='BuyPersonRelationshipId'] .filter-option-inner").html('Bản thân');
            //Loại giấy tờ tùy thân
            $("#BuyIdentityTypeId").val(1);
            $(".btn.dropdown-toggle.btn-light[data-id='BuyIdentityTypeId'] .filter-option-inner").html('CMND');
            //country
            $("#BuyCountryId").val(1);
            $(".btn.dropdown-toggle.btn-light[data-id='BuyCountryId'] .filter-option-inner").html('Việt Nam');
            $(".buyCountry-input").val('');
            $('.buyCountry-input').addClass('hidden');
            //marial_status
            $("#BeneficiaryMarialStatusId").val(1);
            $(".btn.dropdown-toggle.btn-light[data-id='BeneficiaryMarialStatusId'] .filter-option-inner").html('Độc thân');
            $(".buyMarialStatus-input").val('');
            $('.buyMarialStatus-input').addClass('hidden');
            //nhóm nghề
            $("#BuyCareerGroupId").val(1);
            $(".btn.dropdown-toggle.btn-light[data-id='BuyCareerGroupId'] .filter-option-inner").html('Nhóm 1');
            //thu nhập trung bình 
            $("#BuyIncomeAverage").val('');
        }
    });
    $('#samebuyBH').on('click', function () {
        if (Number($("#BeneficiaryPersonRelationshipId").val()) === 16) {
            alert('Người được bảo hiểm có mối quan hệ với bên mua bảo hiểm là nhân viên, chọn quan hệ khác ở người được bảo hiểm!');
        } else {
            $('.actionBH-button button').removeClass('active');
            $(this).addClass('active');
            $('.personalbuyBH').removeClass('hidden');
            $('.groupbuyBH').addClass('hidden');
            $('.spbt_bmbh').addClass('hidden');
            $(".personalbuyBH .m-portlet__body .m-portlet-disabled").addClass('disabled');
            $(".personalbuyBH .m-portlet__body .buy-phone-row").addClass('disabled');
            //họ và tên
            $("#BuyFullname").val($("#BeneficiaryFullName").val());
            //giới tính
            var radio_value = $("input[name='BeneficiaryGender']:checked").val();
            if (radio_value === '0') {
                $("input[name='BuyGender']").filter('[value="0"]').prop('checked', true);
            } if (radio_value === '1') {
                $("input[name='BuyGender']").filter('[value="1"]').prop('checked', true);
            }
            //ngày sinh và tuổi
            $("#BuyBirthDay").val($("#BeneficiaryBirth").val());
            $("#age2").val($("#age1").val());
            $("#buyAge").val($("#beneficiaryAge").val());
            //số dấy tờ tùy thân
            $("#BuyIdentityNum").val($("#BeneficiaryIdentityNum").val());
            //ngày cấp
            $("#BuyIdentityDate").val($("#BeneficiaryIdentityDate").val());
            //nơi cấp
            $("#BuyIdentityPlace").val($("#BeneficiaryIdentityPlace").val());
            //Chi tiết nghành nghề 
            $("#BuyCareerDetail").val($("#BeneficiaryCareerDetail").val());
            //nơi làm việc
            $("#BuyWorkPlace").val($("#BeneficiaryWorkPlace").val());
            //email
            $("#BuyEmail").val($("#BeneficiaryEmail").val());
            //Địa chỉ thường trú (theo sổ hộ khẩu)
            $("#BuyAndressPermanent").val($("#BeneficiaryAndressPermanent").val());
            //sdt
            $("#BuyPhone1").val($("#BeneficiaryPhone1").val());
            $("#BuyPhone2").val($("#BeneficiaryPhone2").val());
            //Mối quan hệ với Bên mua bảo hiểm
            $("#BuyPersonRelationshipId").val($("#BeneficiaryPersonRelationshipId").val());
            var BeneficiaryPersonRelationshipId = $(".btn.dropdown-toggle.btn-light[data-id='BeneficiaryPersonRelationshipId'] .filter-option-inner").html();
            $(".btn.dropdown-toggle.btn-light[data-id='BuyPersonRelationshipId'] .filter-option-inner").html(BeneficiaryPersonRelationshipId);
            //Loại giấy tờ tùy thân
            $("#BuyIdentityTypeId").val($("#BeneficiaryIdentityTypeId").val());
            var BeneficiaryIdentityTypeId = $(".btn.dropdown-toggle.btn-light[data-id='BeneficiaryIdentityTypeId'] .filter-option-inner").html();
            $(".btn.dropdown-toggle.btn-light[data-id='BuyIdentityTypeId'] .filter-option-inner").html(BeneficiaryIdentityTypeId);
            //country
            $("#BuyCountryId").val($("#BeneficiaryCountryId").val());
            var BeneficiaryCountryId = $(".btn.dropdown-toggle.btn-light[data-id='BeneficiaryCountryId'] .filter-option-inner").html();
            $(".btn.dropdown-toggle.btn-light[data-id='BuyCountryId'] .filter-option-inner").html(BeneficiaryCountryId);
            $(".buyCountry-input").val($(".beneficiaryCountry-input").val());
            if (Number($("#BeneficiaryCountryId").val()) === 6) {
                $('.buyCountry-input').removeClass('hidden');
            }
            //marial_status
            $("#BuyMarialStatusId").val($("#BeneficiaryMarialStatusId").val());
            var BeneficiaryMarialStatusId = $(".btn.dropdown-toggle.btn-light[data-id='BeneficiaryMarialStatusId'] .filter-option-inner").html();
            $(".btn.dropdown-toggle.btn-light[data-id='BuyMarialStatusId'] .filter-option-inner").html(BeneficiaryMarialStatusId);
            $(".buyMarialStatus-input").val($(".beneficiaryMarialStatus-input").val());
            if (Number($("#BeneficiaryMarialStatusId").val()) === 10) {
                $('.buyMarialStatus-input').removeClass('hidden');
            }
            //nhóm nghề
            $("#BuyCareerGroupId").val($("#BeneficiaryCareerGroupId").val());
            var BeneficiaryCareerGroupId = $(".btn.dropdown-toggle.btn-light[data-id='BeneficiaryCareerGroupId'] .filter-option-inner").html();
            $(".btn.dropdown-toggle.btn-light[data-id='BuyCareerGroupId'] .filter-option-inner").html(BeneficiaryCareerGroupId);
            //thu nhập trung bình 
            $("#BuyIncomeAverage").val($("#BeneficiaryIncomeAverage").val());
        }
    });

    //change form
    $('#BeneficiaryFullName').change(function () {
        const disabled = $(".personalbuyBH .m-portlet__body .m-portlet-disabled").hasClass("disabled");
        if (disabled) {
            $("#BuyFullname").val($("#BeneficiaryFullName").val().trim());
        }
    });
    $("input[name='BeneficiaryGender']").change(function () {
        const disabled = $(".personalbuyBH .m-portlet__body .m-portlet-disabled").hasClass("disabled");
        if (disabled) {
            var radio_value = $("input[name='BeneficiaryGender']:checked").val();
            if (radio_value === '0') {
                $("input[name='BuyGender']").filter('[value="1"]').removeAttr('checked');
                $("input[name='BuyGender']").filter('[value="0"]').attr('checked', true);
            } if (radio_value === '1') {
                $("input[name='BuyGender']").filter('[value="0"]').removeAttr('checked');
                $("input[name='BuyGender']").filter('[value="1"]').attr('checked', true);
            }
        }
    });
    $("#BeneficiaryBirth").change(function () {
        const disabled = $(".personalbuyBH .m-portlet__body .m-portlet-disabled").hasClass("disabled");
        if (disabled) {
            $("#BuyBirthDay").val($("#BeneficiaryBirth").val());
            var value = $("#BeneficiaryBirth").val();
            var date = value.split("/");
            var today = new Date();
            var birthDate = new Date(date[2], date[1] - 1, date[0]);
            var age = today.getFullYear() - birthDate.getFullYear();
            //var m = today.getMonth() - birthDate.getMonth();
            //if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            //    age = age - 1;
            //}
            $("#age2").val(age);
            age = Number(age) === 0 ? 1 : age;
            $("#buyAge").val(age);
        }
    });
    $("#BeneficiaryIdentityNum").change(function () {
        const disabled = $(".personalbuyBH .m-portlet__body .m-portlet-disabled").hasClass("disabled");
        if (disabled) {
            $("#BuyIdentityNum").val($("#BeneficiaryIdentityNum").val().trim());
        }
    });
    $("#BeneficiaryIdentityDate").change(function () {
        const disabled = $(".personalbuyBH .m-portlet__body .m-portlet-disabled").hasClass("disabled");
        if (disabled) {
            $("#BuyIdentityDate").val($("#BeneficiaryIdentityDate").val().trim());
        }
    });
    $("#BeneficiaryIdentityPlace").change(function () {
        const disabled = $(".personalbuyBH .m-portlet__body .m-portlet-disabled").hasClass("disabled");
        if (disabled) {
            $("#BuyIdentityPlace").val($("#BeneficiaryIdentityPlace").val().trim());
        }
    });
    $("#BeneficiaryCareerDetail").change(function () {
        const disabled = $(".personalbuyBH .m-portlet__body .m-portlet-disabled").hasClass("disabled");
        if (disabled) {
            $("#BuyCareerDetail").val($("#BeneficiaryCareerDetail").val().trim());
        }
    });
    $("#BeneficiaryWorkPlace").change(function () {
        const disabled = $(".personalbuyBH .m-portlet__body .m-portlet-disabled").hasClass("disabled");
        if (disabled) {
            $("#BuyWorkPlace").val($("#BeneficiaryWorkPlace").val().trim());
        }
    });
    $("#BuyEmail").change(function () {
        const disabled = $(".personalbuyBH .m-portlet__body .m-portlet-disabled").hasClass("disabled");
        if (disabled) {
            $("#BuyWorkPlace").val($("#BeneficiaryEmail").val().trim());
        }
    });
    $("#BeneficiaryAndressPermanent").change(function () {
        const disabled = $(".personalbuyBH .m-portlet__body .m-portlet-disabled").hasClass("disabled");
        if (disabled) {
            $("#BuyAndressPermanent").val($("#BeneficiaryAndressPermanent").val().trim());
        }
    });
    $("#BeneficiaryPhone1").change(function () {
        const disabled = $(".personalbuyBH .m-portlet__body .m-portlet-disabled").hasClass("disabled");
        if (disabled) {
            $("#BuyPhone1").val($("#BeneficiaryPhone1").val().trim());
        }
    });
    $("#BeneficiaryPhone2").change(function () {
        const disabled = $(".personalbuyBH .m-portlet__body .m-portlet-disabled").hasClass("disabled");
        if (disabled) {
            $("#BuyPhone2").val($("#BeneficiaryPhone2").val().trim());
        }
    });
    $("#BeneficiaryPersonRelationshipId").change(function () {
        const val = Number($("#BeneficiaryPersonRelationshipId").val());
        if (val === 19) {
            $("#samebuyBH").trigger("click");
        } else if (val === 16) {
            $("#groupbuyBH").trigger("click");
        } else {
            $("#personalbuyBH").trigger("click");
        }
        const disabled = $(".personalbuyBH .m-portlet__body .m-portlet-disabled").hasClass("disabled");
        if (disabled) {
            $("#BuyPersonRelationshipId").val($("#BeneficiaryPersonRelationshipId").val());
            var BeneficiaryPersonRelationshipId = $(".btn.dropdown-toggle.btn-light[data-id='BeneficiaryPersonRelationshipId'] .filter-option-inner").html();
            $(".btn.dropdown-toggle.btn-light[data-id='BuyPersonRelationshipId'] .filter-option-inner").html(BeneficiaryPersonRelationshipId);
        }
    });
    $("#BeneficiaryIdentityTypeId").change(function () {
        const disabled = $(".personalbuyBH .m-portlet__body .m-portlet-disabled").hasClass("disabled");
        if (disabled) {
            $("#BuyIdentityTypeId").val($("#BeneficiaryIdentityTypeId").val());
            var BeneficiaryIdentityTypeId = $(".btn.dropdown-toggle.btn-light[data-id='BeneficiaryIdentityTypeId'] .filter-option-inner").html();
            $(".btn.dropdown-toggle.btn-light[data-id='BuyIdentityTypeId'] .filter-option-inner").html(BeneficiaryIdentityTypeId);
        }
    });
    $("#BeneficiaryCountryId").change(function () {
        const disabled = $(".personalbuyBH .m-portlet__body .m-portlet-disabled").hasClass("disabled");
        if (disabled) {
            $("#BuyCountryId").val($("#BeneficiaryCountryId").val());
            var BeneficiaryCountryId = $(".btn.dropdown-toggle.btn-light[data-id='BeneficiaryCountryId'] .filter-option-inner").html();
            $(".btn.dropdown-toggle.btn-light[data-id='BuyCountryId'] .filter-option-inner").html(BeneficiaryCountryId);
        }
    });
    $("#BeneficiaryMarialStatusId").change(function () {
        const disabled = $(".personalbuyBH .m-portlet__body .m-portlet-disabled").hasClass("disabled");
        if (disabled) {
            $("#BuyMarialStatusId").val($("#BeneficiaryMarialStatusId").val());
            var BeneficiaryMarialStatusId = $(".btn.dropdown-toggle.btn-light[data-id='BeneficiaryMarialStatusId'] .filter-option-inner").html();
            $(".btn.dropdown-toggle.btn-light[data-id='BuyMarialStatusId'] .filter-option-inner").html(BeneficiaryMarialStatusId);
        }
    });
    $("#BeneficiaryCareerGroupId").change(function () {
        const disabled = $(".personalbuyBH .m-portlet__body .m-portlet-disabled").hasClass("disabled");
        if (disabled) {
            $("#BuyCareerGroupId").val($("#BeneficiaryCareerGroupId").val());
            var BeneficiaryCareerGroupId = $(".btn.dropdown-toggle.btn-light[data-id='BeneficiaryCareerGroupId'] .filter-option-inner").html();
            $(".btn.dropdown-toggle.btn-light[data-id='BuyCareerGroupId'] .filter-option-inner").html(BeneficiaryCareerGroupId);
        }
    });
    $("#BeneficiaryIncomeAverage").change(function () {
        const disabled = $(".personalbuyBH .m-portlet__body .m-portlet-disabled").hasClass("disabled");
        if (disabled) {
            $("#BuyIncomeAverage").val($("#BeneficiaryIncomeAverage").val().trim());
        }
    });
    //Applicational page
    $('.create-new-data').on('click', function () {
        $('#m_repeater_1 .data-clone').addClass('active');
    });

    $('.payment').change(function () {
        if ($('.payment-money').is(':checked')) {
            $('.register-transfer').fadeOut(300);
        } else if ($('.payment-transfer').is(':checked')) {
            $('.register-transfer').fadeIn(300);
        }
    });

    $('.payment').change(function () {
        if ($('.payment-money').is(':checked')) {
            $('.register-transfer').fadeOut(300);
        } else if ($('.payment-transfer').is(':checked')) {
            $('.register-transfer').fadeIn(300);
        }
    });

    $('#select_box_insurrance').change(function () {
        var select = $(this).find(':selected').val();
        $(".show-data").hide();
        $('#' + select).show();
        $('.' + select).show();
    }).change();


    $('#relationship').on('change', function () {
        var optionText = $("#relationship option:selected").text();
        if (optionText === "Khác") {
            $(".other-relationship").fadeIn(300);
        } else {
            $(".other-relationship").fadeOut(300);
        }
    });

    $('#relationship-2').on('change', function () {
        alert('dang change');
        var optionText = $("#relationship-2 option:selected").text();
        alert(optionText);
        if (optionText === "Khác") {
            $(".other-relationship-2").fadeIn(300);
        } else {
            $(".other-relationship-2").fadeOut(300);
        }
    });

    // get health-info table
    $(".detail-1 input").keyup(function () {
        valueName = $(".detail-name").val();
        valueProblem = $(".detail-problem").val();
        valueHospital = $(".detail-hospital").val();
        valueResult = $(".detail-result").val();

        $('.show-value-1 .value1').text(valueName);
        $('.show-value-1 .value2').text(valueProblem);
        $('.show-value-1 .value3').text(valueHospital);
        $('.show-value-1 .value4').text(valueResult);
    });
    // end health-info table
    //End Application page

    $(".m-form__group .txt-number").on('keyup', function () {
        var n = parseInt($(this).val().replace(/\D/g, ''), 10);
        $(this).val(n.toLocaleString());
    });

    $(".datebirth").on('change', function () {
        var target = $(this).data('control-age');
        var target_name = $(this).data('control-age-name');
        var value = $(this).val();
        var date = value.split("/");
        var today = new Date();
        var birthDate = new Date(date[2], date[1] - 1, date[0]);
        var age = today.getFullYear() - birthDate.getFullYear();
        //var m = today.getMonth() - birthDate.getMonth();
        //if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        //    age = age - 1;
        //}
        //return age;
        //if (age > 0) {
        //    $(target).val(age);
        //} else {
        //    alert('Số tuổi cần lớn hơn 0');
        //}
        $(target).val(age);
        age = Number(age) === 0 ? 1 : age;
        $(target_name).val(age);
        if (age < 18) {
            $(target).closest('.m-form').find('.phone1 span').empty().text('');
        }
        else {
            $(target).closest('.m-form').find('.phone1 span').empty().text('*');
        }
    });

    $("select.beneficiaryCountry").on('change', function () {
        var value = $(this).val();
        if (Number(value) === 6) {
            console.log('remove');
            $(this).closest('.form-group').find('.beneficiaryCountry-input').removeClass('hidden');
        } else {
            console.log('add');
            $(this).closest('.form-group').find('.beneficiaryCountry-input').addClass('hidden');
        }
    });

    $("select.buyCountry").on('change', function () {
        var value = $(this).val();
        if (Number(value) === 6) {
            console.log('remove');
            $(this).closest('.form-group').find('.buyCountry-input').removeClass('hidden');
        } else {
            console.log('add');
            $(this).closest('.form-group').find('.buyCountry-input').addClass('hidden');
        }
    });
    $("select.beneficiaryMarialStatus").on('change', function () {
        var value = $(this).val();
        if (Number(value) === 10) {
            console.log('remove');
            $(this).closest('.form-group').find('.beneficiaryMarialStatus-input').removeClass('hidden');
        } else {
            console.log('add');
            $(this).closest('.form-group').find('.beneficiaryMarialStatus-input').addClass('hidden');
        }
    });

    $("select.buyMarialStatus").on('change', function () {
        var value = $(this).val();
        if (Number(value) === 10) {
            console.log('remove');
            $(this).closest('.form-group').find('.buyMarialStatus-input').removeClass('hidden');
        } else {
            console.log('add');
            $(this).closest('.form-group').find('.buyMarialStatus-input').addClass('hidden');
        }
    });

    $(".m-aside-box .btn-nav").on('click', function () {
        $('body').addClass('nav-active');
        $(this).closest('.m-content').addClass('nav-open');
        $(this).closest('.m-aside').addClass('active');
        $(this).hide();
    });

    $("#close-nav").on('click', function () {
        $('body').removeClass('nav-active');
        $(this).closest('.m-content').removeClass('nav-open');
        $(this).closest('.m-aside').removeClass('active');
        $('.m-aside-box .btn-nav').show();
    });

    // E-RECEIPT PAGE
    $(".check").click(function () {
        var bol = $("input:checkbox:checked").length >= 1;
        $("input:checkbox").not(":checked").attr("disabled", bol);
    });
    // END E-RECEIPT PAGE

    // Click option show textarea
    // var checkbox = $("#trigger");
    // var hidden = $("#hidden_fields");
    // hidden.hide();
    // checkbox.change(function() {
    //     if (checkbox.is(':checked')) {
    //         hidden.show();
    //     } else {
    //         hidden.hide();
    //     }
    // });
    // End Click option show textarea

    $('#check_BH input').on('change', function () {
        var radioValue = $("input[name='radio73']:checked").val();
        if (radioValue === 1) {
            $('.more_info_BH').removeClass('hidden');
        } else {
            $('.more_info_BH').addClass('hidden');
        }
    });

    $('.health_test input[type="radio"]').on('change', function () {
        var radioValue = $(this).val();
        //console.log(radioValue);
        if (radioValue === 1) {
            $(this).closest('.form-group').find('.info-detail').removeClass('hidden');
        } else {
            $(this).closest('.form-group').find('.info-detail').addClass('hidden');
        }
    });

    $('.action-tabs .btn').on('click', function (e) {
        e.preventDefault();
        var target = $(this).attr('href');
        //console.log(target);
        //$(this).closest('.m-accordion__item').find('.m-accordion__item-head').click();
        $(target).find('.m-accordion__item-head').click();
    });
    //$("#moneyBH").on("keypress keyup blur",function (event) {    
    //   $(this).val($(this).val().replace(/[^\d].+/, ""));
    //    if ((event.which < 48 || event.which > 57)) {
    //        event.preventDefault();
    //    }
    //});
    $(".m-input").change(function (e) {
        var text = $(this).val();
        $(this).val(text.trim());
    })

    $(".price-input").change(function (e) {
        var id = $(this).attr('id');
        var text = $(this).val();
        text = text.split('.').join("");
        var regex = /^[0-9]+$/;
        if (text !== "") {
            if (text.match(regex)) {
                $("input[name=" + id + "]").val(Number(text));
                var l = text.length;
                if (l > 3) {
                    let text_new = formatStringToPrice(text);
                    $(this).val(text_new);
                }
            } else {
                alert('Thông tin này chỉ được nhập số, không được nhập chữ và ký tự đặc biệt');
                $(this).val('');
                $(this).focus();
                //let text_new = formatStringToPrice(text.substring(0, text.length - 1));
                //$(this).val(text_new);
            }
        }
    });

    $(".input-number").change(function (e) {
        var text = $(this).val();
        var regex = /^[0-9]+$/;
        if (text !== "") {
            if (!text.match(regex)) {
                alert('Thông tin này chỉ được nhập số, không được nhập chữ và ký tự đặc biệt');
                $(this).val('');
                $(this).focus();
            }
        }
    });
});


function formatStringToPrice(text) {
    text = text.replace(/^0+/, '');
    var l = text.length;
    var u = l % 3 === 0 ? (Math.floor(l / 3)) - 1 : Math.floor(l / 3);
    var text_new = text.substr(0, l - (u * 3));
    for (i = u - 1; i >= 0; i--) {
        text_new = text_new + '.' + text.substr(-3 * (i + 1), 3);
    }
    return text_new;
}

function showPass(item) {
    if (!$(item).hasClass('active')) {
        $(item).addClass('active');
        $(item).closest('.form-group').find('.form-control').attr("type", "text");
        $('.show-pass').hide();
        $('.hide-pass').show();
    } else {
        $(item).removeClass('active');
        $(item).closest('.m-password').find('.form-control').attr("type", "password");
        $('.show-pass').show();
        $('.hide-pass').hide();
    }
}
// tinhTong
function tinhTong(formId) {
    var sum = 0;
    $(formId + " .m-form__group .txt-number").each(function () {
        var value = $(this).val();
        value = value.replace(/\./g, '');
        console.log(value);
        if (value === '') {
            sum += 0;
        } else {
            sum += parseInt(value);
        }
    });
    $(formId + " .sum").html(sum.toLocaleString());
}
$(document).on("change", "#debts .m-form__group .txt-number", function () {
    tinhTong('#debts');
});
$(document).on("change", "#necessities .m-form__group .txt-number", function () {
    tinhTong('#necessities');
});
// End form tính tổng

function goToByScroll(id) {
    if (jQuery(id).length) {
        jQuery('html,body').animate({
            scrollTop: jQuery(id).offset().top - 130
        }, '500');
    }
}
var SweetAlert2Demo = {
    init: function () {
        $("#illustration_save").click(function (e) {
            swal("", "Thông tin của bạn đã được lưu", "success")
        }),
            //$("#illustration_save_send").click(function (e) {
            //    swal("", "Thông tin của bạn đã được lưu, vui lòng kiểm tra email", "success");
            //}),
            $("#illustration_cancle").click(function (e) {
                swal({
                    title: "Bạn có chắc muốn hủy không?",
                    type: "warning",
                    showCancelButton: !0,
                    confirmButtonText: "Đồng ý!",
                    cancelButtonText: "Không đồng ý!"
                }).then(function (e) {
                    if (e.value) {
                        window.location.href = "/bang-minh-hoa";
                    }
                    //window.location.href = "tvv-list-th.html";
                })
            }),
            $("#app_cancle").click(function (e) {
                swal({
                    title: "Bạn có chắc muốn hủy không?",
                    type: "warning",
                    showCancelButton: !0,
                    confirmButtonText: "Hủy!",
                    cancelButtonText: "Thoát!"
                }).then(function (e) {
                    if (e.value) {
                        window.location.href = "tvv-list-th.html";
                    }
                    //window.location.href = "tvv-list-th.html";
                })
            }),
            $("#finish_form").click(function (e) {
                swal("", "Thông tin của bạn đã được gửi", "success")
            })
    }
};
var FormControls = {
    init: function () {
        $("#forgetPass").validate({
            rules: {
                account: {
                    required: !0
                }
            }
            , invalidHandler: function (e, r) {
                $("#m_form_1_msg").removeClass("m--hide").show()
            }
            , submitHandler: function (e) {
                $('.modal-content').hide();
                $('.submit-success').show();

            }
        }
        )
    }
};


var FormRepeater = {
    init: function () {
        $("#m_repeater_1, #m_repeater_2, #m_repeater_3, #m_repeater_4").repeater({
            initEmpty: !1,
            defaultValues: {
                "text-input": "foo"
            },
            show: function () {
                $(this).slideDown();
                $(".datepicker, #m_datepicker_1, #m_datepicker_2, #m_datepicker_3").datepicker({
                    rtl: mUtil.isRTL(), todayHighlight: !0, orientation: "bottom left", templates: t
                });
                $(".m_selectpicker").selectpicker();
            },
            hide: function (e) {
                $(this).slideUp(e)
            }
        })
    }
};

// 
var BootstrapSelect = {
    init: function () {
        $(".m_selectpicker").selectpicker()
    }
};
var BootstrapDatepicker = function () {
    var date = new Date();
    var fullYear = date.getFullYear();
    var year_18 = fullYear - 18;
    var year_65 = fullYear - 65;
    var date_65 = new Date("1/1/" + year_65);
    var date_18 = new Date("12/31/" + year_18);
    var t;
    t = mUtil.isRTL() ? {
        leftArrow: '<i class="la la-angle-right"></i>', rightArrow: '<i class="la la-angle-left"></i>'
    }
        : {
            leftArrow: '<i class="la la-angle-left"></i>', rightArrow: '<i class="la la-angle-right"></i>'
        }
        ;
    return {
        init: function () {
            $(".m_datepicker").datepicker({
                rtl: mUtil.isRTL(), todayHighlight: !0, orientation: "bottom left", templates: t, format: 'dd/mm/yyyy', startDate: date_65, endDate: date_18
            }
            ),
                $("#BeneficiaryIdentityDate, #BuyIdentityDate, #DateOfLicense, #OrgannizationBirthDate").datepicker({
                    rtl: mUtil.isRTL(), todayHighlight: !0, orientation: "bottom left", templates: t, format: 'dd/mm/yyyy', endDate: new Date(new Date().setDate(new Date().getDate() - 30))
                }
                ),
                $(".m_datepicker_beneficiary").datepicker({
                    rtl: mUtil.isRTL(), todayHighlight: !0, orientation: "bottom left", templates: t, format: 'dd/mm/yyyy', startDate: date_65, endDate: new Date(new Date().setDate(new Date().getDate() - 180))
                }
                )
        }
    };
}

    ();

jQuery(document).ready(function () {
    var t;
    t = mUtil.isRTL() ? {
        leftArrow: '<i class="la la-angle-right"></i>', rightArrow: '<i class="la la-angle-left"></i>'
    }
        : {
            leftArrow: '<i class="la la-angle-left"></i>', rightArrow: '<i class="la la-angle-right"></i>'
        };
    $(".datepicker").datepicker({
        rtl: mUtil.isRTL(), todayHighlight: !0, orientation: "bottom left", templates: t, format: 'dd/mm/yyyy'
    });
    SweetAlert2Demo.init();
    FormControls.init();
    FormRepeater.init();
    BootstrapDatepicker.init();
    BootstrapSelect.init();
});
