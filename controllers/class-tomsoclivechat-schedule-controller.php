<?php

class tomsoclivechat_Schedule_Controller {
	public $cleanup;
	public $cleanupTime;
	protected $log_file;
	
	function __construct(){
		add_filter( 'cron_schedules', array($this, 'tomsoclivechat_cron_schedules') );
		add_action( 'init', array($this, 'schedule_init') );
	}

	public function schedule_init() {
		$this->log_file = TOMLIVECHAT_PATH . 'tomsoclivechat.log';
		$data = get_option('tomsoclivechat_options');		
		$this->cleanup = $data['enable_chat_cleanup']; 
		$this->cleanupTime = $data['chat_cleanup_interval'];		
		if($this->cleanup){
			add_action('tomsoclivechat_timely_cleanup_event', array($this, 'tomsoclivechat_db_cleanup_function'));
			register_deactivation_hook("tomsoclivechat/tomsoclivechat.php", array($this, 'deschedule_target_clean_update'));

			$this->schedule_target_clean_update();
			
		}else{
			$this->deschedule_target_clean_update();
		}
	}
	
	//add a monthly, weekly, yearly interval to use in cron jobs
	public function tomsoclivechat_cron_schedules($schedules){
		$schedules['monthly'] = array(
			'interval' => 2592000, //60*60*24*30 really 30 days
			'display' => __('Once Monthly')
		);
		$schedules['weekly'] = array(
			'interval' => 604800, //60*60*24*7 really 30 days
			'display' => __('Once weekly')
		);
		$schedules['yearly'] = array(
			'interval' => 31536000, //60*60*24*365 really 30 days
			'display' => __('Once yearly')
		);
		$schedules['every_three_minutes'] = array(
            'interval'  => 180,
            'display'   => __( 'Every 3 Minutes', 'textdomain' )
    	);
 		$schedules['every_five_minutes'] = array(
            'interval'  => 300,
            'display'   => __( 'Every 5 Minutes', 'textdomain' )
    	); 
		$schedules['every_ten_minutes'] = array(
            'interval'  => 600,
            'display'   => __( 'Every 10 Minutes', 'textdomain' )
    	);
    	$schedules['every_fifteen_minutes'] = array(
            'interval'  => 900,
            'display'   => __( 'Every 15 Minutes', 'textdomain' )
    	); 

		return $schedules;
	}
	public function schedule_target_clean_update(){
        if(!wp_next_scheduled('tomsoclivechat_timely_cleanup_event') && isset($this->cleanupTime)){
            wp_schedule_event(time(), $this->cleanupTime, 'tomsoclivechat_timely_cleanup_event');
        }
    }

    public function deschedule_target_clean_update(){
        if(wp_next_scheduled('tomsoclivechat_timely_cleanup_event')){
            wp_clear_scheduled_hook('tomsoclivechat_timely_cleanup_event');
        }
    }
	public function tomsoclivechat_db_cleanup_function(){
		
        global $wpdb;
		
		$wpdb->query( "DELETE FROM {$wpdb->prefix}tomsoclivechat_message WHERE chat_time < NOW()" );
		
		//$this->log('Chat Database cleanup finished');

    }
	
	protected function log($title, $code = null, $message = null){
        //if((defined('WP_DEBUG') && WP_DEBUG)){
            $log_file_append = '['.gmdate('D, d M Y H:i:s \G\M\T').'] ' . $title;

            if($code !== null){
               $log_file_append .= ', code: ' . $code;
            }

            if($message !== null){
               $log_file_append .= ', message: ' . $message;
            }
            file_put_contents($this->log_file, $log_file_append . "\n", FILE_APPEND);
        //}
    }

}


?>