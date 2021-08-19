<?php
/*		
	Plugin Name: tomsoc live chat
	Description: The tomsoc.net live chat is by far the most extraordinary chat on the market. See the online status of your friends, send files (ODT, DOC, JPG, PNG, PDF), chat with several users at the same time, get a notification tone and enjoy the mobile version without installing the APP. The tomsoc.net chat is 100% BuddyPress compatible - and 100% dependent on it, so BuddyPress must be installed.
	Version: 1.0.0
	Author: tomsoc.net
	Author URI: https://tomsoc.net/the-tomsoc-net-live-chat-product-and-support-section/
	License: GPLv2
*/
	
if( !defined('TOMLIVECHAT_PATH') )
	define( 'TOMLIVECHAT_PATH', plugin_dir_path(__FILE__) );
if( !defined('TOMLIVECHAT_URL') )
	define( 'TOMLIVECHAT_URL', plugin_dir_url(__FILE__ ) );

//with trailing slash
require_once 'ajax/class-tomsoclivechat-ajax.php';
require_once 'admin/class-tomsoclivechat-database-manager.php';
require_once 'admin/class-tomsoclivechat-options.php';

class tomsoclivechat_Apps {
	
	 public function __construct() {
		 
    }
	
    public function initialize_controllers() {

        require_once 'controllers/class-tomsoclivechat-activation-controller.php';
        $activation_controller = new tomsoclivechat_Activation_Controller();
        $activation_controller->initialize_activation_hooks();
		
		require_once 'controllers/class-tomsoclivechat-schedule-controller.php';
        $schedule_controller = new tomsoclivechat_Schedule_Controller();
    }

    public function initialize_app_controllers() {

		require_once 'controllers/class-tomsoclivechat-script-controller.php';
        $script_controller = new tomsoclivechat_Script_Controller();
        $script_controller->enque_scripts();

        $ajax = new tomsoclivechat_Ajax();
        $ajax->initialize();
    }
	

}

$tomsoclivechat_app = new tomsoclivechat_Apps();
$tomsoclivechat_app->initialize_controllers();

function load_tomsoclivechat(){
	if(is_user_logged_in()){
		$tomsoclivechat_init = new tomsoclivechat_Apps();
		$tomsoclivechat_init->initialize_app_controllers();
		add_action( 'wp_footer', 'bpc_sound_function');
	}
}

add_action('init', 'load_tomsoclivechat');

function bpc_sound_function() {
	$sound = '';
	$sound .= '<audio id="tomsoclivechat_alert">';
	$sound .= '<source src="' . plugins_url( "tomsoclivechat/images/alert.ogg" ) .'" type="audio/ogg">';
	$sound .= '<source src="' . plugins_url( "tomsoclivechat/images/alert.mp3" ) .'" type="audio/ogg">';
	$sound .= '</audio>';
	echo $sound;
}

?>