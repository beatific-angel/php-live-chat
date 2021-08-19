;(function ($) {
    $(document).ready(function () {
        var ChatStored = [];
        var ChatIdStored = [];
        var NotifyUserID = [];
        var ChatCached = "";
        var RequestState1 = true;
        var RequestState2 = true;
        var notifyInterval, showNotifyInterval, friendListRefresh;
        var winNo = [], oldMsgsNo = {}, newMsgsNo = {}, newMessageInterval, blinkImgColor;


        var AjaxChat = {

            tomsoclivechatInit: function () {
                var self = $(this);
                this.LoadFriendsWindow();
                this.eventHandler();
                this.loadChatRow();
                this.submitMessage();
                //this.initializeActiveChats();
                this.searchFriends();
                this.notificationAtTitle();
                this.resizewindow();
            },

            loadFriends: function () {

                if (RequestState2 == true) {
                    RequestState2 = false;
                    $.ajax({
                        url: tomsoclivechat_conf.ajaxURL,
                        type: "POST",
                        dataType: "JSON",
                        data: {
                            action: tomsoclivechat_conf.ajaxActions.load_friends.action,
                            nonce: tomsoclivechat_conf.ajaxNonce
                        },
                        success: function (data) {

                            $(".tomsoclivechatFriendsBody").html(data.FriendsRow);
                            if (parseInt(tomsoclivechat_conf.memberCount)) {
                                $(".tomsoclivechatFriendsCount").html(data.friendsCount);
                            }
                        },
                        complete: function () {
                            friendListRefresh = setTimeout(AjaxChat.loadFriends, tomsoclivechat_conf.friendListRate);
                            RequestState2 = true;
                            var Friendlists = document.querySelectorAll(".tomsoclivechatFriendsBody .tomsoclivechatFriendsImage");

                            for (var i = 0; i < Friendlists.length; i++) {

                                if (Friendlists[i].classList.contains("chat_offline")) {

                                    $(".tomsoclivechatFriendsImage.chat_offline").css("border-color", "#E9EFF3");
                                } else if (Friendlists[i].classList.contains("chat_online")) {

                                    $(".tomsoclivechatFriendsImage.chat_online").css("border-color", "#ff33da80");
                                } else if (Friendlists[i].classList.contains("busy")) {
                                    $(".tomsoclivechatFriendsImage.busy").css("border-color", "#fff02480");
                                }

                            }

                        }
                    });
                }
            },

            refreshFriendsList: function () {
                $(".tomsoclivechatFriendsBody").prepend('<div class="tomsoclivechatFriendsBodyLoading"></div>');
                clearTimeout(friendListRefresh);
                RequestState2 = false;
                $.ajax({
                    url: tomsoclivechat_conf.ajaxURL,
                    type: "POST",
                    dataType: "JSON",
                    data: {
                        action: tomsoclivechat_conf.ajaxActions.refresh_friends.action,
                        nonce: tomsoclivechat_conf.ajaxNonce
                    },
                    success: function (data) {
                        //$(".tomsoclivechatFriendsBodyLoading").remove();
                        $(".tomsoclivechatFriendsBody").html(data.FriendsRow);
                    },
                    complete: function () {
                        friendListRefresh = setTimeout(AjaxChat.loadFriends, tomsoclivechat_conf.friendListRate);
                        RequestState2 = true;

                        var Friendlists = document.querySelectorAll(".tomsoclivechatFriendsImage");
                        for (var i = 0; i < Friendlists.length; i++) {
                            if (Friendlists[i].classList.contains("chat_offline")) {
                                $(".tomsoclivechatFriendsImage.chat_offline").css("border-color", "#E9EFF3");
                            } else if (Friendlists[i].classList.contains("chat_online")) {
                                $(".tomsoclivechatFriendsImage.chat_online").css("border-color", "#ff33da80");
                            } else if (Friendlists[i].classList.contains("busy")) {
                                $(".tomsoclivechatFriendsImage.busy").css("border-color", "#fff02480");
                            }
                        }
                    }
                });
            },

            loadFriendsOnline: function () {
                $(".tomsoclivechatFriendsBody").prepend('<div class="tomsoclivechatFriendsBodyLoading"></div>');
                clearTimeout(friendListRefresh);
                RequestState2 = false;
                $.ajax({
                    url: tomsoclivechat_conf.ajaxURL,
                    type: "POST",
                    dataType: "JSON",
                    data: {
                        action: tomsoclivechat_conf.ajaxActions.online_friends.action,
                        nonce: tomsoclivechat_conf.ajaxNonce
                    },
                    success: function (data) {
                        //$(".tomsoclivechatFriendsBodyLoading").remove();
                        $(".tomsoclivechatFriendsBody").html(data.FriendsRow);
                    },
                    complete: function () {
                        friendListRefresh = setTimeout(AjaxChat.loadFriends, tomsoclivechat_conf.friendListRate);
                        RequestState2 = true;
                    }
                });
            },

            loadbpFriendsOnline: function () {
                $(".tomsoclivechatFriendsBody").prepend('<div class="tomsoclivechatFriendsBodyLoading"></div>');
                clearTimeout(friendListRefresh);
                RequestState2 = false;
                $.ajax({
                    url: tomsoclivechat_conf.ajaxURL,
                    type: "POST",
                    dataType: "JSON",
                    data: {
                        action: tomsoclivechat_conf.ajaxActions.bp_online_friends.action,
                        nonce: tomsoclivechat_conf.ajaxNonce
                    },
                    success: function (data) {
                        //$(".tomsoclivechatFriendsBodyLoading").remove();
                        $(".tomsoclivechatFriendsBody").html(data.FriendsRow);
                    },
                    complete: function () {
                        friendListRefresh = setTimeout(AjaxChat.loadFriends, tomsoclivechat_conf.friendListRate);
                        RequestState2 = true;
                    }
                });
            },

            searchFriends: function () {
                $("body").on("keyup", "#tomsoclivechatSearchFriends", function (e) {
                    if (e.keyCode == 13) {
                        var searchValue = $(this).val();
                        clearTimeout(friendListRefresh);
                        RequestState2 = false;
                        $.ajax({
                            url: tomsoclivechat_conf.ajaxURL,
                            type: "POST",
                            dataType: "JSON",
                            data: {
                                searchData: searchValue,
                                action: tomsoclivechat_conf.ajaxActions.search_friends.action,
                                nonce: tomsoclivechat_conf.ajaxNonce
                            },
                            success: function (data) {
                                $(".tomsoclivechatFriendsBody").html(data.FriendsRow);
                            },
                            complete: function () {
                                friendListRefresh = setTimeout(AjaxChat.loadFriends, tomsoclivechat_conf.friendListRate);
                                RequestState2 = true;
                            }
                        });
                        $(this).val("");
                    }
                });
            },

            createChatWindow: function (userID, userName, WindowState, userImage) {
                var start_text = "Chat with " + userName;
                var chatWindow = '';
                chatWindow += '<div id="chat-window-id-' + userID + '" data-minimize="0" class="tomsoclivechatWindow" data-parameter-window-id="' + userID + '" data-identifier="' + userID + '" data-window-state="' + WindowState + '">';
                chatWindow += '<div class="tomsoclivechatHeader tomsoclivechatFooter" data-event="minimize-window" data-parameter-window-id="' + userID + '">';
                chatWindow += '<div class="tomsoclivechatUser">' + userName + '</div>';
                chatWindow += '<div class="tomsoclivechatoptionslist" id="tomsoclivechatoptionslist-' + userID + '" data-minimize="0"  data-parameter-window-id="' + userID + '" data-identifier="' + userID + '" data-window-state="' + WindowState + '">';
                chatWindow += '<div data-event="minimize-chat-window" class="chatbpc_minimize tomsoclivechatoption" aria-hidden="true" data-parameter-window-id="' + userID + '" data-location="tomsoclivechat-event-minimize-' + userID + '">';
                chatWindow += '<span>MINI</span>';
                chatWindow += '</div>';
                chatWindow += '<div data-event="close-chat-window" data-parameter-window-id="' + userID + '" data-location="tomsoclivechat-event-close-' + userID + '" class="chatclose tomsoclivechatoption">';
                chatWindow += '<span>CLOSE</span>';
                chatWindow += '</div>';
                chatWindow += '<div data-event="busy-chat-window" data-parameter-window-id="' + userID + '" data-location="tomsoclivechat-event-busy-' + userID + '" class="chatbusy tomsoclivechatoption">';
                chatWindow += '<span>BUSY</span>';
                chatWindow += '</div>';
                chatWindow += '<div data-event="ready-chat-window" data-parameter-window-id="' + userID + '" data-location="tomsoclivechat-event-ready-' + userID + '" class="chatready tomsoclivechatoption">';
                chatWindow += '<span>READY</span>';
                chatWindow += '</div>';
                chatWindow += '<div data-event="fileupload-chat-window-head" data-parameter-window-id="' + userID + '" data-location="tomsoclivechat-event-fileupload-' + userID + '" class="chatfileupload tomsoclivechatoption">';
                chatWindow += '<span class="fileupload-chat">FILE+<input type="file" class="file-upload-set" data-parameter-window-id="' + userID + '" id="file-upload-set-head' + userID + '" /></span>';
                chatWindow += '</div>';
                chatWindow += '<div data-event="backtoprofile-window" data-parameter-window-id="' + userID + '" data-location="tomsoclivechat-event-backtoprofile-window-' + userID + '" class="chatbacktoprofile tomsoclivechatoption">';
                chatWindow += '<span>BACK TO PROFILE</span>';
                chatWindow += '</div>';
                chatWindow += '</div>';
                chatWindow += '<textarea  data-event="submit-chat"  id="bp_chat_textarea_head' + userID + '" wrap="physical" style="width: 100%;border: none;padding: 7px 30px 7px 10px;margin: 0;height: 60px;font-size: 12px;background-color: transparent;border: 1px solid #e1e1e1;text-align: center;vertical-align: middle;" placeholder="' + start_text + '" data-parameter-window-id="' + userID + '" ></textarea>';
                chatWindow += '</div>';
                chatWindow += '<div class="tomsoclivechatBody" data-location="tomsoclivechat-body-' + userID + '">';
                chatWindow += '</div>';
                chatWindow += '<div class="tomsoclivechatFooter" style="background: unset !important;">';
                chatWindow += '<div class="tomsoclivechatoptionslist" id="tomsoclivechatoptionslist-' + userID + '" data-minimize="0"  data-parameter-window-id="' + userID + '" data-identifier="' + userID + '" data-window-state="' + WindowState + '">';
                chatWindow += '<div data-event="minimize-chat-window" class="chatbpc_minimize tomsoclivechatoption" aria-hidden="true" data-parameter-window-id="' + userID + '" data-location="tomsoclivechat-event-minimize-' + userID + '">';
                chatWindow += '<span>MINI</span>';
                chatWindow += '</div>';
                chatWindow += '<div data-event="close-chat-window" data-parameter-window-id="' + userID + '" data-location="tomsoclivechat-event-close-' + userID + '" class="chatclose tomsoclivechatoption">';
                chatWindow += '<span>CLOSE</span>';
                chatWindow += '</div>';
                chatWindow += '<div data-event="busy-chat-window" data-parameter-window-id="' + userID + '" data-location="tomsoclivechat-event-busy-' + userID + '" class="chatbusy tomsoclivechatoption">';
                chatWindow += '<span>BUSY</span>';
                chatWindow += '</div>';
                chatWindow += '<div data-event="ready-chat-window" data-parameter-window-id="' + userID + '" data-location="tomsoclivechat-event-ready-' + userID + '" class="chatready tomsoclivechatoption">';
                chatWindow += '<span>READY</span>';
                chatWindow += '</div>';
                chatWindow += '<div data-event="fileupload-chat-window" data-parameter-window-id="' + userID + '" data-location="tomsoclivechat-event-fileupload-' + userID + '" class="chatfileupload tomsoclivechatoption">';
                chatWindow += '<span class="fileupload-chat">FILE+<input type="file" data-parameter-window-id="' + userID + '" class="file-upload-set" id="file-upload-set' + userID + '" /></span>';
                chatWindow += '</div>';
                chatWindow += '</div>';
                chatWindow += '<textarea  data-event="submit-chat"  id="bp_chat_textarea' + userID + '" wrap="physical" style="width: 100%;border: none;padding: 7px 30px 7px 10px;margin: 0;height: 60px;font-size: 12px;background-color: transparent;border: 1px solid #e1e1e1;text-align: center;vertical-align: middle;" placeholder="' + start_text + '" data-parameter-window-id="' + userID + '" ></textarea>';
                chatWindow += '</div>';
                chatWindow += '</div>';
                chatWindow += '<img id="bpc_userimg_' + userID + '" class="bpc_userimg bpc_userimg_grey" data-parameter-window-id="' + userID + '" data-event="open-chat-window" src="' + userImage + '" />';
                if (!$('#chat-window-id-' + userID + '').length) {
                    if ($(window).width() > 768) {
                        $('#tomsoclivechatChatsWindow').append(chatWindow);

                        if ($.inArray(userID, ChatStored) == -1) {
                            ChatStored.push(userID);
                            AjaxChat.setActiveChat(userID, userName, userImage);
                        }
                    } else {
                        var chat_cnt = $('#bpmbchatChatsWindow').length;
                        if (chat_cnt >= 1) {
                            $('.tomsoclivechatWindow').remove();
                            $('.tomsoclivechatoptionslist').remove();
                        }
                        $('#bpmbchatChatsWindow').append(chatWindow);
                        $('#bpmbchatChatsWindow').css('z-index', '9100');
                        $('.tomsoclivechatWindow').css('width', '95% !important');

                        if ($.inArray(userID, ChatStored) == -1) {
                            ChatStored.push(userID);
                            AjaxChat.setActiveChat(userID, userName, userImage);
                        }
                        $('.tomsoclivechatFooter').css('margin-bottom', '20px');
                    }
                }
                if (!$('#tomsoclivechatoptionslist-' + userID + '').length) {
                    $('#tomsoclivechatChatsWindow').append(chatWindow);

                    if ($.inArray(userID, ChatStored) == -1) {
                        ChatStored.push(userID);
                        AjaxChat.setActiveChat(userID, userName, userImage);
                    }
                }
                if (tomsoclivechat_conf.fullHeight && $(window).width() < 768) {
                    $('.tomsoclivechatWindow').css('height', $(window).height() - 50 + 'px');
                    $('.tomsoclivechatWindow').css('max-height', $(window).height() - 50 + 'px');
                    $('.tomsoclivechatBody').css('height', $(window).height() - 150 + 'px');
                    $('.tomsoclivechatBody').css('max-height', $(window).height() - 150 + 'px');

                }
                if ($(window).width() < 768) {
                    var t = document.getElementById('bp_chat_textarea' + userID + '');
                    t.addEventListener('focus', function () {
                        // $('.tomsoclivechatFooter').css('padding-bottom', '20px');
                        $('.tomsoclivechatFriendsCount').addClass('without-after');
                        document.getElementsByClassName('tomsoclivechatFriendsCount')[0].style.width = '60px !important';

                    }, true);
                }
            },

            LoadFriendsWindow: function () {

                var screenwidth = $(window).width();

                $.ajax({
                    url: tomsoclivechat_conf.ajaxURL,
                    type: "POST",
                    dataType: "JSON",
                    data: {
                        action: tomsoclivechat_conf.ajaxActions.load_bpc_window.action,
                        nonce: tomsoclivechat_conf.ajaxNonce,
                        width: screenwidth
                    },
                    success: function (data) {
                        var data = data.bpc_window;
                        $("body").append(data);
                        // $(".widget_bp_core_whos_online_widget .avatar-block")[0].innerHTML = data;
                        // $("#loadingBar").attr("src", tomsoclivechat_conf.pluginsURL + "/tomsoclivechat/images/loading.gif");
                    },
                    complete: function () {
                        AjaxChat.loadFriends();
                    }
                });


            },

            eventHandler: function () {
                $("body").on("click", "[data-event]", function () {
                    var Event = $(this).attr("data-event");
                    switch (Event) {
                        case "close-chat-window":
                            var WindowId = $(this).attr("data-parameter-window-id");
                            $("#chat-window-id-" + WindowId).remove();
                            $("#tomsoclivechatoptionslist-" + WindowId).remove();
                            $("#bpc_userimg_" + WindowId).remove();
                            //ChatStored.remove(WindowId);
                            var index = ChatStored.indexOf(WindowId);
                            if (index >= 0) {
                                ChatStored.splice(index, 1);
                            }
                            var screenwidth = $(window).width();
                            if (screenwidth < 768) {
                                $('.bpmbonlineuser').css("display", "block");
                            }
                            $.ajax({
                                url: tomsoclivechat_conf.ajaxURL,
                                type: "POST",
                                dataType: "JSON",
                                data: {
                                    windowId: WindowId,
                                    action: tomsoclivechat_conf.ajaxActions.remove_active_chat.action,
                                    nonce: tomsoclivechat_conf.ajaxNonce
                                },
                                success: function (data) {
                                }
                            });
                            break;
                        case "close-friends-window":
                            var WindowId = $(this).attr("data-parameter-window-id");
                            $("[data-identifier=\"" + WindowId + "\"]").css("display", "none");
                            $(".listOpenIcon").css("display", "inline-block");
                            $("[data-identifier=\"" + WindowId + "\"]").attr("data-window-state", "0");
                            break;
                        case "fileupload-chat-window":
                            var WindowId = $(this).attr("data-parameter-window-id");
                            var interval = setInterval(function () {

                                if (typeof (document.getElementById("file-upload-set" + WindowId).files[0]) != "undefined") {
                                    var filename_upload = document.getElementById("file-upload-set" + WindowId).files[0].name;
                                    var text_content = document.getElementById('bp_chat_textarea' + WindowId).value;
                                    if (text_content.length !== 0) {
                                        document.getElementById('bp_chat_textarea' + WindowId).value = text_content + '<br>' + filename_upload;
                                        clearInterval(interval);
                                    } else {
                                        document.getElementById('bp_chat_textarea' + WindowId).value = filename_upload;
                                        clearInterval(interval);
                                    }
                                    document.getElementById('bp_chat_textarea' + WindowId).value = filename_upload;

                                    $("body").on("keyup", "[data-event=\"submit-chat\"]", function (e) {
                                        if (e.keyCode == 13) {
                                            clearInterval(interval);
                                        }
                                    });
                                }
                            }, 700);


                            break;
                        case "fileupload-chat-window-head":
                            var WindowId = $(this).attr("data-parameter-window-id");
                            var interval = setInterval(function () {

                                if (typeof (document.getElementById("file-upload-set-head" + WindowId).files[0]) != "undefined") {
                                    var filename_upload = document.getElementById("file-upload-set-head" + WindowId).files[0].name;
                                    var text_content = document.getElementById('bp_chat_textarea_head' + WindowId).value;
                                    if (text_content.length !== 0) {
                                        document.getElementById('bp_chat_textarea_head' + WindowId).value = text_content + '<br>' + filename_upload;
                                        clearInterval(interval);
                                    } else {
                                        document.getElementById('bp_chat_textarea_head' + WindowId).value = filename_upload;
                                        clearInterval(interval);
                                    }
                                    document.getElementById('bp_chat_textarea_head' + WindowId).value = filename_upload;

                                    $("body").on("keyup", "[data-event=\"submit-chat\"]", function (e) {
                                        if (e.keyCode == 13) {
                                            clearInterval(interval);
                                        }
                                    });
                                }
                            }, 700);


                            break;
                        case "open-friends-window":
                            var holder = $(".tomsoclivechatFriendsHolder").attr("data-window-state");
                            if (holder == "0") {
                                $(".tomsoclivechatFriendsHolder").css("display", "block");
                                $(".listOpenIcon").html("&or;");
                                $(".tomsoclivechatFriendsHolder").attr("data-window-state", "1");
                            } else {
                                $(".tomsoclivechatFriendsHolder").css("display", "none");
                                $(".listOpenIcon").html("&and;");
                                $(".tomsoclivechatFriendsHolder").attr("data-window-state", "0");
                            }

                            break;
                        case "mb-open-friends-window":
                            var holder = $(".tomsoclivechatFriendsHolder").attr("data-window-state");
                            if (holder == "0") {
                                $(".tomsoclivechatFriendsHolder").css("display", "block");
                                var holderwidth = $(window).width();
                                $(".tomsoclivechatFriendsHolder").css("width", holderwidth);
                                var holderheight = $(window).height();
                                $(".tomsoclivechatFriendsHolder").css("height", holderheight);
                                $(".tomsoclivechatFriendsHolder").css("background", "#ffffffcc");
                                $(".tomsoclivechatFriendsCount").css("display", "none");
                                $(".chatlogo").css("display", "block");
                                $(".tomsoclivechatFriendsTitle").css("display", "none");
                                $("#tomsoclivechatFriendsWindow").css("bottom", "0px");
                                $(".tomsoclivechatFriendsHolderonline").css("display", "block");
                                $(".btn-back-to-top.btn__visible").css("display", "none");

                                $(".listOpenIcon").html("&or;");
                                $(".tomsoclivechatFriendsHolder").attr("data-window-state", "1");
                            } else {
                                var chat_cnt = $('#bpmbchatChatsWindow').length;
                                if (chat_cnt >= 1) {
                                    $('.tomsoclivechatWindow').remove();
                                    $('.tomsoclivechatoptionslist').remove();
                                }
                                $(".tomsoclivechatFriendsTitle").css("display", "block");
                                $(".tomsoclivechatFriendsCount").css("display", "block");
                                $(".tomsoclivechatFriendsHolder").css("display", "none");
                                $(".tomsoclivechatFriendsCount").css("margin-top", "-60px");
                                $(".listOpenIcon").html("&and;");
                                $(".tomsoclivechatFriendsHolder").attr("data-window-state", "0");
                            }

                            break;
                        case "refresh_friends":
                            AjaxChat.refreshFriendsList();

                            break;
                        case "online_friends":
                            AjaxChat.loadFriendsOnline();
                            AjaxChat.siderloadFriendsOnline();
                            break;
                        case "bp_online_friends":
                            AjaxChat.loadbpFriendsOnline();

                            break;
                        case "bp_group_list":
                            AjaxChat.loadbpGroupList();

                            break;
                        case "bp_group_friend_list":
                            var GroupID = $(this).attr("data-parameter-group-id");
                            var GroupName = $(this).attr("data-parameter-group-name");
                            AjaxChat.loadFriendsByGroupID(GroupID);
                            AjaxChat.siderloadFriendsByGroupID(GroupID);
                            break;
                        case "initialize-chat":
                            var WindowId = $(this).attr("data-parameter-user-id");
                            var userImage = $(this).find('img').attr('src');
                            if (userImage !== undefined) {
                                $(this).find('img')[0].style.borderColor = "#FFE105";
                                $(this).find('img')[0].style.borderWidth = "2px";
                            }
                            var WindowUserName = $(this).attr("data-parameter-user-name");
                            var fholder = $(".tomsoclivechatFriendsHolder").attr("data-window-state");
                            var screenwidth = $(window).width();

                            var new_date = new Date();
                            var date_change_offset = new_date.getTimezoneOffset();

                            if (fholder == "1") {
                                if (screenwidth < 768) {
                                    $('.bpmbonlineuser').css("display", "none");
                                } else {
                                    $(".tomsoclivechatFriendsHolder").css("display", "none");
                                    $(".listOpenIcon").html("&and;");
                                    $(".tomsoclivechatFriendsHolder").attr("data-window-state", "0");
                                }
                            }
                            if ($("#chat-window-id-" + WindowId).length > 0) {
                                $("#chat-window-id-" + WindowId).fadeIn(function () {
                                    $(this).css("display", "block");
                                });
                            } else {
                                if ($(window).width() < 768) {
                                    AjaxChat.createChatWindow(WindowId, WindowUserName, 1, userImage);
                                    $.ajax({
                                        url: tomsoclivechat_conf.ajaxURL,
                                        type: "POST",
                                        dataType: "JSON",
                                        data: {
                                            senderID: WindowId,
                                            action: tomsoclivechat_conf.ajaxActions.load_allchatmb.action,
                                            nonce: tomsoclivechat_conf.ajaxNonce,
                                            time_change: date_change_offset
                                        },
                                        success: function (data) {
                                            data = data.allmessages;
                                            $.each(data, function (i, object) {

                                                var WindowId = i;
                                                var WindowContent = object.replace(/(smiley[0-9]{1,3})/g, '<span class="bpcSmiley bpc-$1"></span>');
                                                var Container = $("[data-location=\"tomsoclivechat-body-" + i + "\"]");
                                                $(Container).append(WindowContent);

                                                var LastMessageId = $(".tomsoclivechatContent").last().attr("data-parameter");
                                                if (LastMessageId !== ChatIdStored[i]) {
                                                    ChatIdStored[i] = LastMessageId;
                                                }
                                            });
                                        }
                                    });
                                } else {


                                    AjaxChat.createChatWindow(WindowId, WindowUserName, 1, userImage);
                                    $.ajax({
                                        url: tomsoclivechat_conf.ajaxURL,
                                        type: "POST",
                                        dataType: "JSON",
                                        data: {
                                            senderID: WindowId,
                                            action: tomsoclivechat_conf.ajaxActions.load_allchat.action,
                                            nonce: tomsoclivechat_conf.ajaxNonce,
                                            time_change: date_change_offset
                                        },
                                        success: function (data) {
                                            data = data.allmessages;
                                            $.each(data, function (i, object) {

                                                var WindowId = i;
                                                var WindowContent = object.replace(/(smiley[0-9]{1,3})/g, '<span class="bpcSmiley bpc-$1"></span>');
                                                var Container = $("[data-location=\"tomsoclivechat-body-" + i + "\"]");
                                                var ScrollTop = $(Container).scrollTop();
                                                var CurrentHeight = $(Container).prop("scrollHeight") - 266;
                                                $(Container).append(WindowContent);
                                                var NewHeight = $(Container).prop("scrollHeight") - 266;
                                                var Difference = NewHeight - CurrentHeight;
                                                $(Container).scrollTop($(Container).prop("scrollHeight"));

                                                var LastMessageId = $(".tomsoclivechatContent").last().attr("data-parameter");
                                                if (LastMessageId !== ChatIdStored[i]) {
                                                    ChatIdStored[i] = LastMessageId;
                                                }

                                            });
                                        }
                                    });
                                }
                            }
                            break;
                        case "minimize-chat-window":
                            var miniWindowId = $(this).attr('data-parameter-window-id');
                            $("#chat-window-id-" + miniWindowId).attr('data-minimize', 1);
                            $("#chat-window-id-" + miniWindowId).slideUp("slow");
                            $("#bpc_userimg_" + miniWindowId).slideDown("slow");
                            $("#tomsoclivechatoptionslist-" + miniWindowId).attr('data-minimize', 1);
                            $("#tomsoclivechatoptionslist-" + miniWindowId).slideUp("slow");
                            break;
                        case "open-chat-window":
                            var openWindowId = $(this).attr('data-parameter-window-id');
                            if ($(this).hasClass('bpc_userimg_green')) {
                                $(this).removeClass('bpc_userimg_green').addClass('bpc_userimg_grey');
                            }
                            $("#chat-window-id-" + openWindowId).attr('data-minimize', 0);
                            $("#bpc_userimg_" + openWindowId).slideUp("slow");
                            $("#chat-window-id-" + openWindowId).slideDown("slow");
                            break;
                        case "busy-chat-window":
                            $.ajax({
                                url: tomsoclivechat_conf.ajaxURL,
                                type: "POST",
                                dataType: "JSON",
                                data: {
                                    action: tomsoclivechat_conf.ajaxActions.load_busy.action,
                                    nonce: tomsoclivechat_conf.ajaxNonce
                                },
                                success: function (data) {
                                    console.log(data);
                                }
                            });
                            if ($(window).width() < 768) {
                                document.getElementsByClassName('chatbusy')[0].style.display = "none";
                                document.getElementsByClassName('chatready')[0].style.display = "block";
                            } else {
                                document.getElementsByClassName('chatbusy')[1].style.display = "none";
                                document.getElementsByClassName('chatready')[1].style.display = "block";
                            }

                            break;
                        case "ready-chat-window":
                            $.ajax({
                                url: tomsoclivechat_conf.ajaxURL,
                                type: "POST",
                                dataType: "JSON",
                                data: {
                                    action: tomsoclivechat_conf.ajaxActions.load_ready.action,
                                    nonce: tomsoclivechat_conf.ajaxNonce
                                },
                                success: function (data) {
                                    if (data == 'ready') {
                                        if ($(window).width() < 768) {
                                            document.getElementsByClassName('chatbusy')[0].textContent = "BUSY";
                                        } else {
                                            document.getElementsByClassName('chatbusy')[1].textContent = "BUSY";
                                        }

                                    }
                                }
                            });
                            if ($(window).width() < 768) {
                                document.getElementsByClassName('chatready')[0].style.display = "none";
                                document.getElementsByClassName('chatbusy')[0].style.display = "block";
                            } else {
                                document.getElementsByClassName('chatready')[1].style.display = "none";
                                document.getElementsByClassName('chatbusy')[1].style.display = "block";
                            }
                            break;
                        case "backtoprofile-window":
                            $.ajax({
                                url: tomsoclivechat_conf.ajaxURL,
                                type: "POST",
                                dataType: "JSON",
                                data: {
                                    action: tomsoclivechat_conf.ajaxActions.loginbp.action,
                                    nonce: tomsoclivechat_conf.ajaxNonce
                                },
                                success: function (data) {
                                    location.href = data;
                                }
                            });
                            break;
                        case "delete-chatrecord":
                            $(this).css("display", "none !important");
                            break;
                    }
                });
            },

            setActiveChat: function (WindowId, WindowUserName, UserImage) {
                $.ajax({
                    url: tomsoclivechat_conf.ajaxURL,
                    type: "POST",
                    dataType: "JSON",
                    data: {
                        windowId: WindowId,
                        UserImage: UserImage,
                        WindowUserName: WindowUserName,
                        windowState: 1,
                        action: tomsoclivechat_conf.ajaxActions.set_active_chat.action,
                        nonce: tomsoclivechat_conf.ajaxNonce
                    },
                    success: function (data) {
                    },
                    complete: function () {
                        RequestState5 = true;
                    }
                });
            },
            loadChatRow: function () {
                var new_date = new Date();
                var date_change_offset = new_date.getTimezoneOffset();
                if (RequestState1 == true) {
                    RequestState1 = false;
                    $.ajax({
                        url: tomsoclivechat_conf.ajaxURL,
                        type: "POST",
                        dataType: "JSON",
                        data: {
                            action: tomsoclivechat_conf.ajaxActions.load_chat.action,
                            nonce: tomsoclivechat_conf.ajaxNonce,
                            time_change:date_change_offset
                        },
                        success: function (data) {
                            var senderdata = data.bpc_senderinfo;
                            var chatdata = data.bpc_chatinfo;

                            jQuery.each(senderdata, function (i, object) {
                                var WindowId = i;
                                var WindowUserName = object.SenderName;
                                var avatar = object.avatar;
                                if ($("#chat-window-id-" + WindowId).length > 0) {
                                    // Do nothing
                                } else {
                                    AjaxChat.createChatWindow(WindowId, WindowUserName, 1, avatar);
                                }
                            });
                            jQuery.each(chatdata, function (i, object) {

                                var chatID = i;
                                var senderID = object.senderid;
                                var receiverID = object.receiverid;
                                var pmessage = object.message;
                                var message = pmessage.replace(/(smiley[0-9]{1,3})/g, '<span class="bpcSmiley bpc-$1"></span>');
                                var chatTime = object.chat_time;
                                console.log(chatTime);

                                var avatar = object.avatar;
                                var message_file = '';
                                var Container = $("[data-location=\"tomsoclivechat-body-" + senderID + "\"]");
                                if (message.indexOf('.png') !== -1 || message.indexOf('.pdf') !== -1 || message.indexOf('.jpg') !== -1 || message.indexOf('.doc') !== -1 || message.indexOf('.odt') !== -1) {
                                    message_file = 'No message sent, but <span style="color:#cf2d7c">file attached</span>';
                                }
                                var WindowContent = '<div class="tomsoclivechatMessageRow bpc_clear"><div class="tomsoclivechatMessageUserImage leftImage"><img src="' + avatar + '" /></div><div class="tomsoclivechatMessage leftMessage"><div data-parameter="' + chatID + '" class="tomsoclivechatContent tomsoclivechatMessageLocation-' + senderID + '">' + message + '<br><span style="margin-top:5px;font-size:6px;text-align:center;">' + chatTime + '</span></div></div><div data-file-type-parameter="' + chatID + '" class="file_type_chat_parent" id="file_type_chat_parent" style="display: none"><div class="file_type_chat" id="doc_file">DOC</div><div class="file_type_chat" id="pdf_file">PDF</div><div class="file_type_chat" id="jpg_file">JPG</div><div class="file_type_chat" id="png_file">PNG</div><div class="file_type_chat" id="odt_file">ODT</div></div></div>';
                                // var msg = '<div class="tomsoclivechatMessageRow bpc_clear"><div class="tomsoclivechatMessageUserImage rightImage"><img src="' + userImage + '" /></div><div class="tomsoclivechatMessage rightMessage"><div data-parameter="' + n + '" id="tomsoclivechatMessageLocation-' + WindowId + '" class="tomsoclivechatContent tomsoclivechatMessageLocation-' + WindowId + '">' + Message + '<br><span style="margin-top:5px;font-size:6px;text-align:center;">' + datetime_now + '</span></div></div></div>';
                                if ($(window).width() < 768) {
                                    $(Container).prepend(WindowContent);
                                } else {
                                    $(Container).append(WindowContent);
                                    $(Container).scrollTop($(Container).prop("scrollHeight"));
                                }
                                if (message.indexOf('.doc') !== -1) {
                                    $('*[data-file-type-parameter=' + chatID + ']')[0].style.display = "block";
                                    var origin_file = $('*[data-parameter=' + chatID + ']')[0];
                                    origin_file.innerHTML = message_file;
                                    var mydiv = $('*[data-file-type-parameter=' + chatID + ']')[0].children[0];
                                    mydiv.textContent = "";
                                    var aTag = document.createElement('a');
                                    aTag.setAttribute('href', message);
                                    aTag.setAttribute('target', '_blank');
                                    aTag.setAttribute('style', 'color:#ffc107;');
                                    aTag.textContent = 'DOC';
                                    mydiv.appendChild(aTag);
                                } else if (message.indexOf('.pdf') !== -1) {
                                    $('*[data-file-type-parameter=' + chatID + ']')[0].style.display = "block";
                                    var origin_file = $('*[data-parameter=' + chatID + ']')[0];
                                    origin_file.innerHTML = message_file;
                                    var mydiv = $('*[data-file-type-parameter=' + chatID + ']')[0].children[1];
                                    mydiv.textContent = "";
                                    var aTag = document.createElement('a');
                                    aTag.setAttribute('href', message);
                                    aTag.setAttribute('target', '_blank');
                                    aTag.setAttribute('style', 'color:#ffc107;');
                                    aTag.textContent = 'PDF';
                                    mydiv.appendChild(aTag);
                                } else if (message.indexOf('.jpg') !== -1 || message.indexOf('.jpeg') !== -1) {
                                    $('*[data-file-type-parameter=' + chatID + ']')[0].style.display = "block";
                                    var origin_file = $('*[data-parameter=' + chatID + ']')[0];
                                    origin_file.innerHTML = message_file;
                                    var mydiv = $('*[data-file-type-parameter=' + chatID + ']')[0].children[2];
                                    mydiv.textContent = "";
                                    var aTag = document.createElement('a');
                                    aTag.setAttribute('href', message);
                                    aTag.setAttribute('target', '_blank');
                                    aTag.setAttribute('style', 'color:#ffc107;');
                                    aTag.textContent = 'JPG';
                                    mydiv.appendChild(aTag);
                                } else if (message.indexOf('.png') !== -1) {
                                    $('*[data-file-type-parameter=' + chatID + ']')[0].style.display = "block";
                                    var origin_file = $('*[data-parameter=' + chatID + ']')[0];
                                    origin_file.innerHTML = message_file;
                                    var mydiv = $('*[data-file-type-parameter=' + chatID + ']')[0].children[3];
                                    mydiv.textContent = "";
                                    var aTag = document.createElement('a');
                                    aTag.setAttribute('href', message);
                                    aTag.setAttribute('target', '_blank');
                                    aTag.setAttribute('style', 'color:#ffc107;');
                                    aTag.textContent = 'PNG';
                                    mydiv.appendChild(aTag);
                                } else if (message.indexOf('.odt') !== -1) {
                                    $('*[data-file-type-parameter=' + chatID + ']')[0].style.display = "block";
                                    var origin_file = $('*[data-parameter=' + chatID + ']')[0];
                                    origin_file.innerHTML = message_file;
                                    var mydiv = $('*[data-file-type-parameter=' + chatID + ']')[0].children[4];
                                    mydiv.textContent = "";
                                    var aTag = document.createElement('a');
                                    aTag.setAttribute('href', message);
                                    aTag.setAttribute('target', '_blank');
                                    aTag.setAttribute('style', 'color:#ffc107;');
                                    aTag.textContent = 'ODT';
                                    mydiv.appendChild(aTag);
                                }
                            });
                        },
                        complete: function () {
                            setTimeout(AjaxChat.loadChatRow, tomsoclivechat_conf.chatRate);
                            RequestState1 = true;
                        }
                    });
                }
            },

            submitMessage: function () {
                $("body").on("keyup", "[data-event=\"submit-chat\"]", function (e) {

                    if (e.keyCode == 13 && event.shiftKey) {
                        var content = this.value;
                        var caret = getCaret(this);
                        jQuery.loadScript = function (url, callback) {
                            jQuery.ajax({
                                url: url,
                                dataType: 'script',
                                success: callback,
                                async: true
                            });
                        }
                        if (typeof someObject == 'undefined') $.loadScript('../wp-content/plugins/tomsoclivechat/js/tomsoclivechat-custom.js', function () {
                            autosize(document.getElementById("bp_chat_textarea"));
                        });
                        this.value = content.substring(0, caret) + "\n" + content.substring(carent, content.length - 1);
                        event.stopPropagation();
                    } else if (e.keyCode == 13) {
                        if (event.shiftKey) {
                            var content = this.value;
                            var caret = getCaret(this);
                            jQuery.loadScript = function (url, callback) {
                                jQuery.ajax({
                                    url: url,
                                    dataType: 'script',
                                    success: callback,
                                    async: true
                                });
                            }
                            if (typeof someObject == 'undefined') $.loadScript('../wp-content/plugins/tomsoclivechat/js/tomsoclivechat-custom.js', function () {
                                autosize(document.getElementById("bp_chat_textarea"));
                            });
                            this.value = content.substring(0, caret) + "\n" + content.substring(carent, content.length - 1);
                            event.stopPropagation();
                        }
                        var userImage = tomsoclivechat_conf.avatar;
                        var d = new Date();
                        var n = d.getTime();
                        var pMessage = AjaxChat.escapeTag($.trim($(this).val()));
                        var Message = pMessage.replace(/(smiley[0-9]{1,3})/g, '<span class="bpcSmiley bpc-$1"></span>');
                        var WindowId = $(this).attr("data-parameter-window-id");

                        /* date format */
                        var today = new Date();
                        var curr_date = today.getDate();
                        var curr_month = today.getMonth() + 1;
                        var curr_year = today.getFullYear();
                        var timenow = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
                        var today_num = today.getDay();
                        var today_mon = today.getMonth();
                        var today_year = today.getFullYear();
                        var datetime_now =
                            today.getFullYear() + "-" + ("00" + (today.getMonth() + 1)).slice(-2)
                            + "-" + ("00" + today.getDate()).slice(-2)
                             + " " + ("00" + today.getHours()).slice(-2) + ":"
                            + ("00" + today.getMinutes()).slice(-2)
                            + ":" + ("00" + today.getSeconds()).slice(-2);
                        var Container = $("[data-location=\"tomsoclivechat-body-" + WindowId + "\"]");
                        var msg = '<div class="tomsoclivechatMessageRow bpc_clear"><div class="tomsoclivechatMessageUserImage rightImage"><img src="' + userImage + '" /></div><div class="tomsoclivechatMessage rightMessage"><div data-parameter="' + n + '" id="tomsoclivechatMessageLocation-' + WindowId + '" class="tomsoclivechatContent tomsoclivechatMessageLocation-' + WindowId + '">' + Message + '<br><span style="margin-top:5px;font-size:6px;text-align:center;">' + datetime_now + '</span></div></div><div data-file-type-parameter="' + n + '" class="file_type_chat_parent" id="file_type_chat_parent" style="display: none"><div class="file_type_chat" id="doc_file">DOC</div><div class="file_type_chat" id="pdf_file">PDF</div><div class="file_type_chat" id="jpg_file">JPG</div><div class="file_type_chat" id="png_file">PNG</div><div class="file_type_chat" id="odt_file">ODT</div></div></div>';
                        var msg_empty = '<div class="tomsoclivechatMessageRow bpc_clear"><div class="tomsoclivechatMessageUserImage rightImage"><img src="' + userImage + '" /></div><div class="tomsoclivechatMessage rightMessage"><div data-parameter="' + n + '" id="tomsoclivechatMessageLocation-' + WindowId + '" class="tomsoclivechatContent tomsoclivechatMessageLocation-' + WindowId + '">No message sent, but <span style="color:#cf2d7c">file attached</span><br><span style="margin-top:5px;font-size:6px;text-align:center;">' + datetime_now + '</span></div></div><div data-file-type-parameter="' + n + '" class="file_type_chat_parent" id="file_type_chat_parent" style="display: none"><div class="file_type_chat" id="doc_file">DOC</div><div class="file_type_chat" id="pdf_file">PDF</div><div class="file_type_chat" id="jpg_file">JPG</div><div class="file_type_chat" id="png_file">PNG</div><div class="file_type_chat" id="odt_file">ODT</div></div></div>';
                        if ($(window).width() < 768) {
                            file_data = $("#file-upload-set-head" + WindowId)[0].files[0];
                        } else {
                            file_data = $("#file-upload-set" + WindowId)[0].files[0];
                        }
                        if (file_data) {
                            var filesize = file_data.size;
                        }
                        if (filesize && pMessage !== "") {
                            form_data = new FormData();
                            form_data.append('file', file_data);
                            form_data.append('action', 'file_upload');
                            if (pMessage.indexOf('.png') !== -1 || pMessage.indexOf('.pdf') !== -1 || pMessage.indexOf('.jpg') !== -1 || pMessage.indexOf('.doc') !== -1 || pMessage.indexOf('.odt') !== -1) {
                                if ($(window).width() < 768) {
                                    $(Container).prepend(msg_empty);
                                } else {
                                    $(Container).append(msg_empty);
                                    $(Container).scrollTop($(Container).prop("scrol lHeight"));
                                }
                                if (filesize > 1045152) {
                                    alert('File too large. File must be less than 1 MB.');
                                    return;
                                } else if (filesize < 1045152) {
                                    var add_mon = today_mon + 1;
                                    var sendMessage = window.location.origin + "/wp-content/uploads/" + today_year + "/" + add_mon + "/" + pMessage;
                                    sendMessage = sendMessage.replace(/\s+/g, '-');
                                    $.ajax({
                                        url: tomsoclivechat_conf.ajaxURL,
                                        type: "POST",
                                        dataType: "JSON",
                                        data: {
                                            messageContent: sendMessage,
                                            receiverUserId: WindowId,
                                            action: tomsoclivechat_conf.ajaxActions.submit_message.action,
                                            nonce: tomsoclivechat_conf.ajaxNonce
                                        },
                                        success: function (data) {
                                            //AjaxChat.loadChatRow();
                                        }
                                    });
                                    $.ajax({
                                        url: tomsoclivechat_conf.ajaxURL,
                                        type: 'POST',
                                        contentType: false,
                                        processData: false,
                                        data: form_data,
                                        success: function (response) {

                                            response = response.slice(0, -1);
                                            if ($(window).width() < 768) {
                                                $("#file-upload-set-head" + WindowId)[0].value = "";
                                            } else {
                                                $("#file-upload-set" + WindowId)[0].value = "";
                                            }
                                            $('*[data-file-type-parameter=' + n + ']')[0].style.display = "block";
                                            var mydiv = $('*[data-file-type-parameter=' + n + ']')[0];
                                            var filetype = file_data.type;
                                            var changed_size = filesize / 1024;
                                            var changed_size = Math.floor(changed_size);
                                            if (file_data.name.indexOf('doc') !== -1) {
                                                var mydiv = $('*[data-file-type-parameter=' + n + ']')[0].children[0];
                                                mydiv.textContent = "";
                                                var aTag = document.createElement('a');
                                                aTag.setAttribute('href', response);
                                                aTag.setAttribute('target', '_blank');
                                                aTag.setAttribute('style', 'color:#ffc107;');
                                                aTag.textContent = 'DOC';
                                                mydiv.appendChild(aTag);
                                            } else if (filetype.indexOf('pdf') !== -1) {
                                                var mydiv = $('*[data-file-type-parameter=' + n + ']')[0].children[1];
                                                mydiv.textContent = "";
                                                var aTag = document.createElement('a');
                                                aTag.setAttribute('href', response);
                                                aTag.setAttribute('target', '_blank');
                                                aTag.setAttribute('style', 'color:#ffc107;');
                                                aTag.textContent = 'PDF';
                                                mydiv.appendChild(aTag);
                                            } else if (filetype.indexOf('jpg') !== -1 || filetype.indexOf('jpeg') !== -1) {
                                                var mydiv = $('*[data-file-type-parameter=' + n + ']')[0].children[2];
                                                mydiv.textContent = "";
                                                var aTag = document.createElement('a');
                                                aTag.setAttribute('href', response);
                                                aTag.setAttribute('target', '_blank');
                                                aTag.setAttribute('style', 'color:#ffc107;');
                                                aTag.textContent = 'JPG';
                                                mydiv.appendChild(aTag);
                                            } else if (filetype.indexOf('png') !== -1) {
                                                var mydiv = $('*[data-file-type-parameter=' + n + ']')[0].children[3];
                                                mydiv.textContent = "";
                                                var aTag = document.createElement('a');
                                                aTag.setAttribute('href', response);
                                                aTag.setAttribute('target', '_blank');
                                                aTag.setAttribute('style', 'color:#ffc107;');
                                                aTag.textContent = 'PNG';
                                                mydiv.appendChild(aTag);
                                            } else if (file_data.name.indexOf('odt') !== -1) {
                                                var mydiv = $('*[data-file-type-parameter=' + n + ']')[0].children[4];
                                                mydiv.textContent = "";
                                                var aTag = document.createElement('a');
                                                aTag.setAttribute('href', response);
                                                aTag.setAttribute('target', '_blank');
                                                aTag.setAttribute('style', 'color:#ffc107;');
                                                aTag.textContent = 'ODT';
                                                mydiv.appendChild(aTag);
                                            }
                                            $(Container).scrollTop($(Container).prop("scrollHeight"));
                                        }
                                    });
                                }
                            }
                        } else if (filesize == undefined && pMessage !== "") {
                            if ($(window).width() < 768) {
                                $(Container).prepend(msg);
                            } else {
                                $(Container).append(msg);
                                $(Container).scrollTop($(Container).prop("scrollHeight"));
                            }
                            $.ajax({
                                url: tomsoclivechat_conf.ajaxURL,
                                type: "POST",
                                dataType: "JSON",
                                data: {
                                    messageContent: pMessage,
                                    receiverUserId: WindowId,
                                    action: tomsoclivechat_conf.ajaxActions.submit_message.action,
                                    nonce: tomsoclivechat_conf.ajaxNonce
                                },
                                success: function (data) {
                                    //AjaxChat.loadChatRow();
                                }
                            });
                        }
                        $(this).val("");
                    }
                    $("#bpmbchatChatsWindow").css('margin-bottom', '0px');
                });

                function getCaret(el) {
                    if (el.selectionStart) {
                        return el.selectionStart;
                    } else if (document.selection) {
                        el.focus();

                        var r = document.selection.createRange();
                        if (r == null) {
                            return 0;
                        }

                        var re = el.createTextRange(),
                            rc = re.duplicate();
                        re.moveToBookmark(r.getBookmark());
                        rc.setEndPoint('EndToStart', re);

                        return rc.text.length;
                    }
                    return 0;
                }
            },

            escapeTag: function (string) {
                var map = {
                    '&': '&amp;',
                    '<': '&lt;',
                    '>': '&gt;',
                    '"': '&quot;',
                    "'": '&#039;'
                };

                return string.replace(/[&<>"']/g, function (m) {
                    return map[m];
                });
            },

            initializeActiveChats: function () {
                $.ajax({
                    url: tomsoclivechat_conf.ajaxURL,
                    type: "POST",
                    dataType: "JSON",
                    data: {
                        action: tomsoclivechat_conf.ajaxActions.load_active_chat.action,
                        nonce: tomsoclivechat_conf.ajaxNonce
                    },
                    success: function (data) {
                        data = data.ChatStored;
                        $.each(data, function (i, object) {
                            var WindowId = data[i].WINDOWID;
                            var UserName = data[i].USERNAME;
                            var UserImage = data[i].USERIMAGE;
                            var WindowState = data[i].STATE;
                            AjaxChat.createChatWindow(WindowId, UserName, WindowState, UserImage);

                            $.ajax({
                                url: tomsoclivechat_conf.ajaxURL,
                                type: "POST",
                                dataType: "JSON",
                                data: {
                                    senderID: WindowId,
                                    action: tomsoclivechat_conf.ajaxActions.load_allchat.action,
                                    nonce: tomsoclivechat_conf.ajaxNonce
                                },
                                success: function (data) {
                                    data = data.allmessages;
                                    $.each(data, function (i, object) {
                                        var WindowId = i;
                                        var WindowContent = object.replace(/(smiley[0-9]{1,3})/g, '<span class="bpcSmiley bpc-$1"></span>');
                                        var Container = $("[data-location=\"tomsoclivechat-body-" + i + "\"]");

                                        var ScrollTop = $(Container).scrollTop();
                                        var CurrentHeight = $(Container).prop("scrollHeight") - 266;

                                        $(Container).prepend(WindowContent);
                                        var NewHeight = $(Container).prop("scrollHeight") - 266;
                                        var Difference = NewHeight - CurrentHeight;
                                        $(Container).scrollTop($(Container).prop("scrollHeight"));
                                    });
                                }

                            });
                        });
                    }
                });
            },

            notificationAtTitle: function () {
                var timer = 0, newtitle = [], oldtitle = document.title;
                newtitle.push(oldtitle);
                var vis = (function () {
                    var stateKey, eventKey, keys = {
                        hidden: "visibilitychange",
                        webkitHidden: "webkitvisibilitychange",
                        mozHidden: "mozvisibilitychange",
                        msHidden: "msvisibilitychange"
                    };
                    for (stateKey in keys) {
                        if (stateKey in document) {
                            eventKey = keys[stateKey];
                            break;
                        }
                    }
                    return function (c) {
                        if (c) document.addEventListener(eventKey, c);
                        return !document[stateKey];
                    }
                })();
                vis(function () {
                    var boxname = [], chatno = {};
                    var audioplayer = document.getElementById("tomsoclivechat_alert");
                    $(".tomsoclivechatWindow").each(function (i, element) {
                        var id = $(this).attr('id');
                        chatno[id] = $(this).find('.tomsoclivechatMessageRow').length;
                    });

                    if (!vis()) {
                        notifyInterval = setInterval(function () {
                            var nchatno = {}, ntitle;
                            $(".tomsoclivechatWindow").each(function (i, element) {
                                var nid = $(this).attr('id'),
                                    ntitle = $(this).find('.tomsoclivechatUser').html() + ' sent you new message';

                                nchatno[nid] = $(this).find('.tomsoclivechatMessageRow').length;

                                if (nchatno[nid] > chatno[nid] && $.inArray(ntitle, newtitle) == -1) {
                                    newtitle.push(ntitle);
                                }
                            });
                        }, 2000);

                        showNotifyInterval = setInterval(function () {
                            if (newtitle.length > 1) {
                                document.title = newtitle[timer];
                                timer++
                                if (timer >= newtitle.length) {
                                    timer = 0;
                                }
                                audioplayer.play();
                            }
                        }, 3000);

                    } else {
                        clearInterval(notifyInterval);
                        clearInterval(showNotifyInterval);
                        document.title = oldtitle;
                        newtitle = [];
                        newtitle.push(oldtitle);
                        audioplayer.pause();
                    }

                });

                newMessageInterval = setInterval(function () {
                    $(".tomsoclivechatWindow").each(function () {
                        var wid = $(this).attr('data-parameter-window-id');
                        newMsgsNo[wid] = $(this).find('.tomsoclivechatBody').children().length;

                        if ($(this).attr('data-minimize') == 1 && (newMsgsNo[wid] > oldMsgsNo[wid])) {
                            if ($("#bpc_userimg_" + wid).hasClass('bpc_userimg_grey')) {
                                $("#bpc_userimg_" + wid).removeClass('bpc_userimg_grey').addClass('bpc_userimg_green');
                            } else if ($("#bpc_userimg_" + wid).hasClass('bpc_userimg_green')) {
                                $("#bpc_userimg_" + wid).removeClass('bpc_userimg_green').addClass('bpc_userimg_grey');
                            }

                        }
                        oldMsgsNo[wid] = $(this).find('.tomsoclivechatBody').children().length;
                    })

                }, 3500);

                blinkImgColor = setInterval(function () {
                    if ($(".bpc_userimg_green").length > 0) {
                        $(".bpc_userimg_green").each(function () {
                            var randColor = '#' + (Math.random() * 0xFFFFFF << 0).toString(16);
                            $(this).css('border-color', randColor)
                        })
                    }

                }, 1000);
            },

            resizewindow: function () {
                if (tomsoclivechat_conf.fullHeight && $(window).width() < 768) {
                    $(window).resize(function (e) {
                        $('.tomsoclivechatWindow').css('height', $(window).height() + 'px');
                        $('.tomsoclivechatBody').css('height', $(window).height() - 64 + 'px');
                    });
                }
            }
        }

        AjaxChat.tomsoclivechatInit();

    });
}(jQuery));
