<?php

class tomsoclivechat_Activation_Controller {

    public function initialize_activation_hooks() {
        register_activation_hook("tomsoclivechat/tomsoclivechat.php", array($this, 'execute_activation_hooks'));
		//register_deactivation_hook(__FILE__, array($this, 'execute_deactivation_hooks'));
		//register_uninstall_hook(__FILE__, array($this, 'execute_uninstall_hooks'));
		
		add_action('wp_login', array($this, 'update_user_login'), 10, 2);
		add_action( 'user_register', array($this, 'update_new_user_meta', 10, 1 ));
		add_action('clear_auth_cookie', array($this, 'update_login_status'), 10);
    }

    public function execute_activation_hooks() {
		
        $database_manager = new tomsoclivechat_Database_Manager();
		
        $database_manager->create_custom_tables();
		        
    }
	
	public function execute_deactivation_hooks() {
		// Will be executed when the client deactivates the plugin
    }
	public function execute_uninstall_hooks() {
		// Will be executed when the client deactivates the plugin
		
    }
	public function update_user_login( $user_login, $user ) {
		// your code
		
		$user = get_user_by( 'login', $user_login );
		$blogtime = current_time( 'mysql' ); 
		update_user_meta( $user->ID, 'bpc_login_time', $blogtime );
		update_user_meta( $user->ID, 'bpc_login_status', 'online' );
	}
	public function update_new_user_meta( $user_id ) {
		$blogtime = current_time( 'mysql' ); 
		update_user_meta( $user_id, 'bpc_login_time', $blogtime );
		update_user_meta( $user_id, 'bpc_login_status', 'offline' );
	}
	public function update_login_status() {
		$blogtime = current_time( 'mysql' ); 
		$user = wp_get_current_user();
		update_user_meta( $user->ID, 'bpc_login_time', $blogtime );
		update_user_meta( $user->ID, 'bpc_login_status', 'offline' );
	}


}

?>