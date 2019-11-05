jQuery(document).ready(function ($) {
    var arrFileObj = new Array();
    var arrIds = new Array();
    var arrRemoveIds = new Array();
    var __arrID = [];
    var contracts = [];
    var row = 1;
    var __arrCodes = [];
    Array.prototype.remove = function (el) {
        var idx = this.indexOf(el);
        if (idx !== -1) {
            {
                this.splice(idx, 1);

            }
        }
        return this;
    };

    function ChangeRandom() {
        $("#imageRandom").attr("src", "/showCaptchaImage?width=90&height=34&t=" + new Date().getMilliseconds());
    }

    $("#personalbuyBH").click(function () {
        $("#TypeBuyInsurance").val(1);
    });

    // tính phí cơ bản
    $("#BMH_Insurance_Total").change(function () {
        var soTienBaoHiem = Number(($(this).val()).split('.').join(""));
        var age = $("#age1").val();
        var heho = $("#AdditionalInsuranceMoneID").val();
        if (heho > 1) {
            var name = $("#AdditionalInsuranceMoneID option:selected").text();
            var heso = parseInt(name);
            var total = soTienBaoHiem * heso;
            $("#BMH_Insurance_TotalMore").val(formatPrice(total));
        } else {
            $("#BMH_Insurance_TotalMore").val(formatPrice(0));
        }

        $.post('/Illustration/PhiBaoHiemCoBan', { soTienBaoHiem: soTienBaoHiem, ageNDBH: age }, function (data) {
            $("#BMH_Insurance_FeeBase").val(formatPrice(data));
            $("input[name=BMH_Insurance_FeeBase]").val(data);
            $("#PhiBaoHiemDuKien").val(formatPrice(data));
            $("input[name=PhiBaoHiemDuKien]").val(data);
            const totalPhi = formatStringPrice($("#TongPhiBHBT").val()) + data;
            $('#TongPhiBHBT-SPC').val(formatPrice(totalPhi));
            $("input[name=TongPhiBHBT-SPC]").val(totalPhi);
        });
    });

    $(".InputMoney").change(function () {
        var code = $(this).data('code');
        var id = $(this).data('id');
        var soTienNhap = Number($(this).val().split('.').join(""));
        var ageNDBH = Number($("#age1").val());
        var genderNDBH = $('input[name=BeneficiaryGender]:checked', '#frmIllustration').val();
        var ageBMBH = Number($("#age2").val());
        var soTienBaoHiem = formatStringPrice($("#BMH_Insurance_Total").val());
        console.log(ageNDBH, soTienNhap);
        if (code === "BHBT_BenhHiemNgheo") {
            if (ageNDBH === null || ageNDBH === '') {
                alert('Bạn chưa chọn ngày sinh người được bảo hiểm');
                $(this).val('');
                return false;
            } else if (soTienNhap === 0) {
                alert('Bạn chưa nhập số tiền bảo hiểm trong form sản phẩm bổ trợ');
                $(this).val('');
                return false;
            } else if (typeof genderNDBH === 'undefined' || genderNDBH === null) {
                alert('Bạn chưa chọn giới tính người được bảo hiểm');
                $(this).val('');
                return false;
            } else {
                if (ageNDBH > 18) {
                    if (soTienNhap > 5000000000) {
                        alert('Số tiền bảo hiểm tối đa của BH Bệnh hiểm nghèo nâng cao đối với NĐBH > 18 tối đa là 5 tỷ đồng');
                        $(this).val('');
                        return false;
                    } else {
                        port_BHBT_BenhHiemNgheo(soTienNhap, ageNDBH, genderNDBH, code);
                    }
                } else {
                    if (soTienNhap > 2500000000) {
                        alert('Số tiền bảo hiểm tối đa của BH Bệnh hiểm nghèo nâng cao đối với NĐBH ≤ 18 tuổi là 2.5 tỷ đồng');
                        $(this).val('');
                        return false;
                    } else {
                        port_BHBT_BenhHiemNgheo(soTienNhap, ageNDBH, genderNDBH, code);
                    }
                }
            }
        }
        else if (code === "BHBT_BenhHiemNgheo_CI20") {
            if (ageNDBH === null || ageNDBH === '') {
                alert('Bạn chưa chọn ngày sinh người được bảo hiểm');
                $(this).val('');
                return false;
            } else if (soTienBaoHiem === 0) {
                alert('Bạn chưa nhập số tiền bảo hiểm chính');
                $(this).val('');
                return false;
            } else if (soTienNhap === 0) {
                alert('Bạn chưa nhập số tiền bảo hiểm trong form sản phẩm bổ trợ');
                $(this).val('');
                return false;
            } else if (typeof genderNDBH === 'undefined' || genderNDBH === null) {
                alert('Bạn chưa chọn giới tính người được bảo hiểm');
                $(this).val('');
                return false;
            } else {
                if (soTienNhap > soTienBaoHiem) {
                    alert('Số tiền bảo hiểm hỗ trợ bệnh hiểm nghèo không được vượt quá số tiền bảo hiểm cơ bản');
                    $(this).val('');
                    return false;
                } else if (soTienNhap > 4000000000) {
                    alert('Số tiền bảo hiểm hỗ trợ bệnh hiểm nghèo không được vượt quá 4 tỷ');
                    $(this).val('');
                    return false;
                } else if (soTienNhap % 1000000 !== 0) {
                    alert('Số tiền BH hỗ trợ bệnh hiểm nghèo phải là bội số của 1.000.000');
                    $(this).val('');
                    return false;
                } else {
                    port_BHBT_BenhHiemNgheo_CI20(soTienNhap, ageNDBH, genderNDBH, code);
                }
            }
        }
        else if (code === "BHBT_TV_TTTBV") {
            if (ageNDBH === null || ageNDBH === '') {
                alert('Bạn chưa chọn ngày sinh người được bảo hiểm');
                $(this).val('');
                return false;
            } else if (soTienBaoHiem === 0) {
                alert('Bạn chưa nhập số tiền bảo hiểm chính');
                $(this).val('');
                return false;
            } else if (soTienNhap === 0) {
                alert('Bạn chưa nhập số tiền bảo hiểm trong form sản phẩm bổ trợ');
                $(this).val('');
                return false;
            } else {
                if (soTienNhap > soTienBaoHiem) {
                    alert('Số tiền bảo hiểm hỗ trợ thương tật vĩnh viễn do tai nạn không được vượt quá số tiền bảo hiểm cơ bản');
                    $(this).val('');
                    return false;
                } else if (soTienNhap > 3000000000 || soTienNhap < 50000000) {
                    alert('Số tiền bảo hiểm cho quyền lợi TV, TTTBVV do tai nạn từ 50.000.000 đến 3 tỷ');
                    $(this).val('');
                    return false;
                } else if (soTienNhap % 1000000 !== 0) {
                    alert('Số tiền BH hỗ trợ thương tật vĩnh viễn do tai nạn phải là bội số của 1.000.000');
                    $(this).val('');
                    return false;
                } else {
                    port_BHBT_TV_TTTBVV(soTienNhap, soTienBaoHiem, ageNDBH, code);
                }
            }
        }
        else if (code === "BHBT_TTTBV") {
            if (ageNDBH === null || ageNDBH === '') {
                alert('Bạn chưa chọn ngày sinh người được bảo hiểm');
                $(this).val('');
                return false;
            } else if (soTienNhap === 0) {
                alert('Bạn chưa nhập số tiền bảo hiểm trong form sản phẩm bổ trợ');
                $(this).val('');
                return false;
            } else if (soTienBaoHiem === 0) {
                alert('Bạn chưa nhập số tiền bảo hiểm chính');
                $(this).val('');
                return false;
            } else {
                port_BHBT_TTVV(soTienNhap, soTienBaoHiem, ageNDBH, code);
            }
        }
        else if (code === "BHBT_HoTroThuNhap") {
            if (ageBMBH === null || ageBMBH === '') {
                alert('Bạn chưa chọn ngày sinh người được bảo hiểm');
                $(this).val('');
                return false;
            } else if (soTienNhap === 0) {
                alert('Bạn chưa nhập số tiền bảo hiểm trong form sản phẩm bổ trợ');
                $(this).val('');
                return false;
            } else if (soTienBaoHiem === 0) {
                alert('Bạn chưa nhập số tiền bảo hiểm chính');
                $(this).val('');
                return false;
            } else {
                port_BHBT_HoTroThuNhap(soTienNhap, soTienBaoHiem, ageBMBH, code);
            }
        }
    });

    $("#BMH_Insurance_FeeRecuring").change(function () {
        var value = $(this).val();

        if (value === "1") {
            $("#TotalInsuranceFeeRecuring").html("1/2");
        }
        else {
            $("#TotalInsuranceFeeRecuring").html("1");
        }
    });

    $("#LuaChonTienBaoHiem").change(function () {
        var code = $(this).data('code');
        var luachon = $(this).val();
        var ageNDBH = $("#age1").val();
        if (code === "BHBT_NamVien") {
            if (ageNDBH === null || ageNDBH === '') {
                alert('Bạn chưa chọn ngày sinh người được bảo hiểm');
                $(this).val('');
                return false;
            }
            port_BHBT_NamVien(luachon, ageNDBH, code);
        }
    });

    $("#groupbuyBH").click(function () {
        $("#TypeBuyInsurance").val(2);
    });


    $("#samebuyBH").click(function () {
        $("#TypeBuyInsurance").val(1);
    });

    $("#AdditionalInsuranceMoneID").change(function () {
        var name = $("#AdditionalInsuranceMoneID option:selected").text();
        var id = $(this).val();
        var soTienBaoHiem = Number(($("#BMH_Insurance_Total").val()).split('.').join(""));
        var heso = id > 1 ? parseInt(name) : 0;
        var total = soTienBaoHiem * heso;
        $("#BMH_Insurance_TotalMore").val(formatPrice(total));
        $("#AdditionalInsuranceMone").val(name);

    });


    function removeId(id) {
        __arrID = __arrID.filter(e => e !== id);
        $('#InsuranceMoreIds').val(__arrID.toString());
    }

    function addId(id) {
        __arrID.push(id);
        $('#InsuranceMoreIds').val(__arrID.toString());
    }

    function removeCode(code) {
        __arrCodes = __arrCodes.filter(e => e !== code);
        $('#InsuranceMoreCodes').val(__arrCodes.toString());
    }

    function addCode(code) {
        __arrCodes.push(code);
        $('#InsuranceMoreCodes').val(__arrCodes.toString());
    }

    function formatPrice(e) {
        var text = String(e).replace(/^0+/, '');
        var l = text.length;
        if (l > 3) {
            var u = l % 3 === 0 ? (Math.floor(l / 3)) - 1 : Math.floor(l / 3);
            var text_new = text.substr(0, l - (u * 3));
            for (i = u - 1; i >= 0; i--) {
                text_new = text_new + '.' + text.substr(-3 * (i + 1), 3);
            }
            return text_new;
        } else {
            return text;
        }
    }

    function formatStringPrice(e) {
        return Number(e.toString().split('.').join(""));
    }

    function port_BHBT_BenhHiemNgheo(soTienNhap, ageNDBH, genderNDBH, code) {
        $.post('/Illustration/BHBT_BenhHiemNgheo', { soTienNhap: soTienNhap, ageNDBH: ageNDBH, genderNDBH: genderNDBH }, function (data) {
            if (!data.IsError) {
                const totalMoney = formatStringPrice($("#" + code).val());
                $("#" + code).val(formatPrice(data.Value));
                const tongPhiBHBT = formatStringPrice($("#TongPhiBHBT").val());
                const total = tongPhiBHBT + data.Value - totalMoney;
                $("#TongPhiBHBT").val(formatPrice(total));
                $("input[name='TongPhiBHBT']").val(total);
                // tính tổng phí chính và bổ trợ
                const totalPhi = total + formatStringPrice($("#BMH_Insurance_FeeBase").val());
                $('#TongPhiBHBT-SPC').val(formatPrice(totalPhi));
                $("input[name='TongPhiBHBT-SPC']").val(totalPhi);
            }
            else {
                alert(data.Message);
            }
        });
    }

    function port_BHBT_BenhHiemNgheo_CI20(soTienNhap, ageNDBH, genderNDBH, code) {
        $.post('/Illustration/BHBT_BenhHiemNgheo_CI20', { soTienNhap: soTienNhap, ageNDBH: ageNDBH, genderNDBH: genderNDBH }, function (data) {
            if (!data.IsError) {
                const totalMoney = formatStringPrice($("#" + code).val());
                $("#" + code).val(formatPrice(data.Value));
                const tongPhiBHBT = formatStringPrice($("#TongPhiBHBT").val());
                const total = tongPhiBHBT + data.Value - totalMoney;
                $("#TongPhiBHBT").val(formatPrice(total));
                $("input[name='TongPhiBHBT']").val(total);
                // tính tổng phí chính và bổ trợ
                const totalPhi = total + formatStringPrice($("#BMH_Insurance_FeeBase").val());
                $('#TongPhiBHBT-SPC').val(formatPrice(totalPhi));
                $("input[name='TongPhiBHBT-SPC']").val(totalPhi);
            }
            else {
                alert(data.Message);
            }
        });
    }

    function port_BHBT_TV_TTTBVV(soTienNhap, soTienBaoHiem, ageNDBH, code) {
        $.post('/Illustration/BHBT_TV_TTTBVV', { soTienNhap: soTienNhap, soTienBaoHiem: soTienBaoHiem, ageNDBH: ageNDBH }, function (data) {
            if (!data.IsError) {
                const totalMoney = formatStringPrice($("#" + code).val());
                $("#" + code).val(formatPrice(data.Value));
                const tongPhiBHBT = formatStringPrice($("#TongPhiBHBT").val());
                var total = tongPhiBHBT + data.Value - totalMoney;
                $("#TongPhiBHBT").val(formatPrice(total));
                $("input[name='TongPhiBHBT']").val(total);
                // tính tổng phí chính và bổ trợ
                const totalPhi = total + formatStringPrice($("#BMH_Insurance_FeeBase").val());
                $('#TongPhiBHBT-SPC').val(formatPrice(totalPhi));
                $("input[name='TongPhiBHBT-SPC']").val(totalPhi);
            }
            else {
                alert(data.Message);
            }
        });
    }

    function port_BHBT_TTVV(soTienNhap, soTienBaoHiem, ageNDBH, code) {
        $.post('/Illustration/BHBT_TTVV', { soTienNhap: soTienNhap, soTienBaoHiem: soTienBaoHiem, ageNDBH: ageNDBH }, function (data) {
            if (!data.IsError) {
                const totalMoney = formatStringPrice($("#" + code).val());
                $("#" + code).val(formatPrice(data.Value));
                const tongPhiBHBT = formatStringPrice($("#TongPhiBHBT").val());
                const total = tongPhiBHBT + data.Value - totalMoney;
                $("#TongPhiBHBT").val(formatPrice(total));
                $("input[name='TongPhiBHBT']").val(total);
                // tính tổng phí chính và bổ trợ
                const totalPhi = total + formatStringPrice($("#BMH_Insurance_FeeBase").val());
                $('#TongPhiBHBT-SPC').val(formatPrice(totalPhi));
                $("input[name='TongPhiBHBT-SPC']").val(totalPhi);
            }
            else {
                alert(data.Message);
            }
        });
    }

    function port_BHBT_HoTroThuNhap(soTienNhap, soTienBaoHiem, ageBMBH, code) {
        $.post('/Illustration/BHBT_HoTroThuNhap', { soTienNhap: soTienNhap, soTienBaoHiem: soTienBaoHiem, ageBMBH: ageBMBH }, function (data) {
            if (!data.IsError) {
                const totalMoney = formatStringPrice($("#" + code).val());
                $("#" + code).val(formatPrice(data.Value));
                const tongPhiBHBT = formatStringPrice($("#TongPhiBHBT").val());
                const total = tongPhiBHBT + data.Value - totalMoney;
                $("#TongPhiBHBT").val(formatPrice(total));
                $("input[name='TongPhiBHBT']").val(total);
                // tính tổng phí chính và bổ trợ
                const totalPhi = total + formatStringPrice($("#BMH_Insurance_FeeBase").val());
                $('#TongPhiBHBT-SPC').val(formatPrice(totalPhi));
                $("input[name='TongPhiBHBT']").val(total);
            }
            else {
                alert(data.Message);
            }
        });
    }

    function port_BHBT_NamVien(luachon, ageNDBH, code) {
        $.post('/Illustration/BHBT_NamVien', { luachon: luachon, ageNDBH: ageNDBH }, function (data) {
            if (!data.IsError) {
                const totalMoney = formatStringPrice($("#" + code).val());
                $("#" + code).val(formatPrice(data.Value));
                const tongPhiBHBT = formatStringPrice($("#TongPhiBHBT").val());
                const total = tongPhiBHBT + data.Value - totalMoney;
                $("#TongPhiBHBT").val(formatPrice(total));
                $("input[name='TongPhiBHBT']").val(total);
                // tính tổng phí chính và bổ trợ
                const totalPhi = total + formatStringPrice($("#BMH_Insurance_FeeBase").val());
                $('#TongPhiBHBT-SPC').val(formatPrice(totalPhi));
                $("input[name='TongPhiBHBT']").val(total);
                $('#LuaChonTienBaoHiem_help')[0].innerHTML = data.Message;
            }
            else {
                alert(data.Message);
            }
        });
    }

    $(".contractYear").change(function () {
        const year = $(this).val();
        if (Number(year) > 1) {
            const code = $(this).data('code');
            var contract = contracts.find(e => e.code === code);
            if (contract) {
                contract.contractYear = year;
            } else {
                contracts.push({
                    code,
                    contractYear: year
                });
            }
            const contractYear = String(contracts.map(e => e.contractYear));
            const totalMoney = String(contracts.map(e => e.contractTotalMoney));
            $("input[name=ContractYear]").val(contractYear);
            $("input[name=TotalMoney]").val(totalMoney);
        } else {
            $(this).val('');
            alert("Không được rút năm đầu tiên");
        }
    });

    $(".contractTotalMoney").change(function () {
        const text = $(this).val().split('.').join("");
        const contractTotalMoney = Number(text);
        const code = $(this).data('code');
        if (contractTotalMoney % 100000 !== 0) {
            alert('Số tiền rút phải là bội số của 100.000');
            $(this).val('');
            return false;
        } else {
            var contract = contracts.find(e => e.code === code);
            if (contract) {
                contract.contractTotalMoney = contractTotalMoney;
            } else {
                contracts.push({
                    code,
                    contractTotalMoney
                });
            }
            $(this).val(formatPrice(text));
            const contractYear = String(contracts.map(e => e.contractYear));
            const totalMoney = String(contracts.map(e => e.contractTotalMoney));
            $("input[name=ContractYear]").val(contractYear);
            $("input[name=TotalMoney]").val(totalMoney);
        }
    });

    $(".InsuranceMoreId").click(function () {
        var id = $(this).val();
        var code = $(this).data('code');
        if ($(this).is(':checked')) {
            addId(id);
            addCode(code);
            var ageNDBH = $("#age1").val();
            if (ageNDBH === null || ageNDBH === '') {
                $(this).prop('checked', false);
                alert('Bạn chưa chọn ngày sinh người được bảo hiểm');
            } else {
                if (code === "BHBT_NamVien") {
                    $("#LuaChonTienBaoHiem").prop("disabled", false);
                    var luachon = $("#LuaChonTienBaoHiem").val();
                    port_BHBT_NamVien(luachon, ageNDBH, code);
                } else {
                    var soTienNhap = Number($("#InputMoney-" + code).val().split('.').join(""));
                    var genderNDBH = $('input[name=BeneficiaryGender]:checked', '#frmIllustration').val();
                    var ageBMBH = Number($("#age2").val());
                    var soTienBaoHiem = $("#BMH_Insurance_Total").val();
                    if (soTienNhap > 0) {
                        if (code === "BHBT_BenhHiemNgheo") {
                            if (genderNDBH) {
                                port_BHBT_BenhHiemNgheo(soTienNhap, ageNDBH, genderNDBH, code);
                            } else {
                                alert('Bạn chưa chọn giới tính người được bảo hiểm');
                            }
                        } else if (code === "BHBT_BenhHiemNgheo_CI20") {
                            if (genderNDBH) {
                                port_BHBT_BenhHiemNgheo_CI20(soTienNhap, ageNDBH, genderNDBH, code);
                            } else {
                                alert('Bạn chưa chọn giới tính người được bảo hiểm');
                            }
                        } else if (code === "BHBT_TV_TTTBV") {
                            if (soTienBaoHiem === 0) {
                                alert('Bạn chưa nhập số tiền bảo hiểm chính');
                            } else {
                                port_BHBT_TV_TTTBVV(soTienNhap, soTienBaoHiem, ageNDBH, code);
                            }
                        } else if (code === "BHBT_TTTBV") {
                            if (soTienBaoHiem === 0) {
                                alert('Bạn chưa nhập số tiền bảo hiểm chính');
                            } else {
                                port_BHBT_TTVV(soTienNhap, soTienBaoHiem, ageNDBH, code);
                            }
                        } else if (code === "BHBT_HoTroThuNhap") {
                            if (soTienBaoHiem === 0) {
                                alert('Bạn chưa nhập số tiền bảo hiểm chính');
                            } else {
                                port_BHBT_HoTroThuNhap(soTienNhap, soTienBaoHiem, ageBMBH, code);
                            }
                        }
                    }
                    $("#InputMoney-" + code).prop("disabled", false);
                }
                if (code !== "BHBT_HoTroThuNhap") {
                    $("#InputMoney-" + code).attr("readonly", false);
                    $("#InputMoney-" + code).focus();
                }
            }
        } else {
            const price = formatStringPrice($("#" + code).val());
            const tongPhiBHBT = formatStringPrice($("#TongPhiBHBT").val());
            $("#TongPhiBHBT").val(formatPrice(tongPhiBHBT - price));
            $("input[name='TongPhiBHBT']").val(tongPhiBHBT - price)
            const TongPhiBHBT_SPC = formatStringPrice($("#TongPhiBHBT-SPC").val());
            $("#TongPhiBHBT-SPC").val(formatPrice(TongPhiBHBT_SPC - price));
            $("input[name='TongPhiBHBT-SPC']").val(TongPhiBHBT_SPC - price)
            removeId(id);
            removeCode(code);
            if (code === "BHBT_NamVien") {
                $("#LuaChonTienBaoHiem").prop("disabled", true);
                $("#" + code).val(0);
            } else {
                $("#InputMoney-" + code).prop("disabled", true);
                $("#" + code).val(0);
            }
        }
    });
});