<?php

if ( !defined( 'WP_UNINSTALL_PLUGIN' ) ) 
    exit();
	
	global $wpdb;
	
	$table = $wpdb->query("DROP TABLE IF EXISTS {$wpdb->prefix}tomsoclivechat_message");
	
	if($table){
		$column = $wpdb->query("ALTER TABLE $wpdb->users 
			DROP tomsoclivechat_status, 
			DROP tomsoclivechat_last_activity");

	}
?>