<?php



if ( ! class_exists( 'tomsoclivechatOptions' ) ) {

	class tomsoclivechatOptions {

			

		function __construct() {

			$this->create_tomsoclivechat_Options();

		}

		

		public function create_tomsoclivechat_Options() {

			require_once(TOMLIVECHAT_PATH . "admin/admin-page-class.php");

			/**

			* configure your admin page

			*/

			$config = array(    

				'menu'           => 'settings',             //sub page to settings page

				'page_title'     => 'tomsoclivechat options',       //The name of this page 

				'capability'     => 'edit_posts',         // The capability needed to view the page 

				'option_group'   => 'tomsoclivechat_options',       //the name of the option to create in the database

				'id'             => 'tomsoclivechat_admin_page',   // meta box id, unique per page

				'fields'         => array(),    // list of fields (can be added by field arrays)

				'local_images'   => false,   // Use local or hosted images (meta box images for add/remove)

				'use_with_theme' => false //change path if used with theme set to true, false for a plugin or anything else for a custom path(default false).

			);  

			

			/**

			* instantiate your admin page

			*/

			$options_panel = new TOMLIVECHAT_Admin_Page_Class($config);

			$options_panel->OpenTabs_container('');

			

			/**

			* define your admin page tabs listing

			*/

			$options_panel->TabsListing(array(

			'links' => array(

			  'options_1' =>  __('Style Options','apc'),

			  'options_2' =>  __('Refresh Options','apc'),

			  'options_3' => __('Database Options','apc'),

			  'options_4' => __('BuddyPress Options','apc'),

			  'options_6' =>  __('Translation','apc'),

			  'options_5' =>  __('Custom Style','apc'),

			  'options_7' =>  __('Import Export','apc'),

			)

			));

			

			/**

			* Open admin page first tab

			*/

			$options_panel->OpenTab('options_1');

			

			/**

			* Add fields to your admin page first tab

			* 

			* Simple options:

			* input text, checbox, select, radio 

			* textarea

			*/

			//title

			$options_panel->Title(__("Style Options","apc"));

			//An optionl descrption paragraph

			$options_panel->addCheckbox('mobile_full_width',array('name'=> __('Full width in mobile ','apc'), 'std' => false, 'desc' => __('Enable full width chat window in mobile device','apc')));

			$options_panel->addCheckbox('mobile_full_height',array('name'=> __('Full height in mobile ','apc'), 'std' => false, 'desc' => __('Enable full height chat window in mobile device','apc')));

			//Color field

			$options_panel->addColor('bpc_friend_title_bg_color',array('name'=> __('Friend title background ','apc'), 'std' => '', 'desc' => __('Friend title background color','apc')));

			$options_panel->addColor('bpc_friend_title_color',array('name'=> __('Friend title color ','apc'), 'std' => '#FFFFFF', 'desc' => __('Friend title text color','apc')));

			$options_panel->addColor('bpc_friend_filter_bg_color',array('name'=> __('Friend filter background ','apc'), 'std' => '', 'desc' => __('Friend filter background color','apc')));

			$options_panel->addColor('bpc_friend_bg_color',array('name'=> __('Friend list background color','apc'), 'std' => '', 'desc' => __('Friend list background color','apc')));

			$options_panel->addImage('bpc_friend_bg_image',array('name'=> __('Friend list background image ','apc'),'preview_height' => '48px', 'preview_width' => '64px', 'desc' => __('','apc')));

			$options_panel->addRadio(

				'bpc_friend_bg_pattern',

				array(

					'bg0'=>'<img class="bpc-radio-image" src="'.TOMLIVECHAT_URL.'images/bg/bg0.png" />',

					'bg1'=>'<img class="bpc-radio-image" src="'.TOMLIVECHAT_URL.'images/bg/bg1.png" />',

					'bg2'=>'<img class="bpc-radio-image" src="'.TOMLIVECHAT_URL.'images/bg/bg2.png" />',

					'bg3'=>'<img class="bpc-radio-image" src="'.TOMLIVECHAT_URL.'images/bg/bg3.png" />',

					'bg4'=>'<img class="bpc-radio-image" src="'.TOMLIVECHAT_URL.'images/bg/bg4.png" />',

					'bg5'=>'<img class="bpc-radio-image" src="'.TOMLIVECHAT_URL.'images/bg/bg5.png" />',

					'bg6'=>'<img class="bpc-radio-image" src="'.TOMLIVECHAT_URL.'images/bg/bg6.png" />',

					'bg7'=>'<img class="bpc-radio-image" src="'.TOMLIVECHAT_URL.'images/bg/bg7.png" />',

					'bg8'=>'<img class="bpc-radio-image" src="'.TOMLIVECHAT_URL.'images/bg/bg8.png" />',

					'bg9'=>'<img class="bpc-radio-image" src="'.TOMLIVECHAT_URL.'images/bg/bg9.png" />',

					'bg10'=>'<img class="bpc-radio-image" src="'.TOMLIVECHAT_URL.'images/bg/bg10.png" />',

					'bg11'=>'<img class="bpc-radio-image" src="'.TOMLIVECHAT_URL.'images/bg/bg11.png" />',

					'bg12'=>'<img class="bpc-radio-image" src="'.TOMLIVECHAT_URL.'images/bg/bg12.png" />',

					'bg13'=>'<img class="bpc-radio-image" src="'.TOMLIVECHAT_URL.'images/bg/bg13.png" />',

					'bg14'=>'<img class="bpc-radio-image" src="'.TOMLIVECHAT_URL.'images/bg/bg14.png" />',

					'bg15'=>'<img class="bpc-radio-image" src="'.TOMLIVECHAT_URL.'images/bg/bg15.png" />',

					'bg16'=>'<img class="bpc-radio-image" src="'.TOMLIVECHAT_URL.'images/bg/bg16.png" />',

					'bg17'=>'<img class="bpc-radio-image" src="'.TOMLIVECHAT_URL.'images/bg/bg17.png" />',

					'bg18'=>'<img class="bpc-radio-image" src="'.TOMLIVECHAT_URL.'images/bg/bg18.png" />',

					'bg19'=>'<img class="bpc-radio-image" src="'.TOMLIVECHAT_URL.'images/bg/bg19.png" />',

					'bg20'=>'<img class="bpc-radio-image" src="'.TOMLIVECHAT_URL.'images/bg/bg20.png" />',

					'bg21'=>'<img class="bpc-radio-image" src="'.TOMLIVECHAT_URL.'images/bg/bg21.png" />',

					'bg22'=>'<img class="bpc-radio-image" src="'.TOMLIVECHAT_URL.'images/bg/bg22.png" />',

					'bg23'=>'<img class="bpc-radio-image" src="'.TOMLIVECHAT_URL.'images/bg/bg23.png" />',

					'bg24'=>'<img class="bpc-radio-image" src="'.TOMLIVECHAT_URL.'images/bg/bg24.png" />',

					'bg25'=>'<img class="bpc-radio-image" src="'.TOMLIVECHAT_URL.'images/bg/bg25.png" />',

					'bg26'=>'<img class="bpc-radio-image" src="'.TOMLIVECHAT_URL.'images/bg/bg26.png" />',

					'bg27'=>'<img class="bpc-radio-image" src="'.TOMLIVECHAT_URL.'images/bg/bg27.png" />',

					'bg28'=>'<img class="bpc-radio-image" src="'.TOMLIVECHAT_URL.'images/bg/bg28.png" />',

					'bg29'=>'<img class="bpc-radio-image" src="'.TOMLIVECHAT_URL.'images/bg/bg29.png" />',

					'bg30'=>'<img class="bpc-radio-image" src="'.TOMLIVECHAT_URL.'images/bg/bg30.png" />',

					'bg31'=>'<img class="bpc-radio-image" src="'.TOMLIVECHAT_URL.'images/bg/bg31.png" />',

					'bg32'=>'<img class="bpc-radio-image" src="'.TOMLIVECHAT_URL.'images/bg/bg32.png" />',

					'none'=>'none',

				),

				array(

					'name'=> __('Friend list background Pattern','apc'),

					'std'=> array('none'), 

					'desc' => __('Select friend list background image','apc')

				)

			);

			$options_panel->addColor('bpc_chat_title_bg_color',array('name'=> __('Chat title background ','apc'), 'std' => '', 'desc' => __('Chat title background color','apc')));

			$options_panel->addColor('bpc_chat_title_text_color',array('name'=> __('Chat title text color ','apc'), 'std' => '', 'desc' => __('Chat title text color','apc')));

			$options_panel->addColor('bpc_chat_bg_color',array('name'=> __('Chat window background color','apc'), 'std' => '', 'desc' => __('Chat window background color','apc')));

			$options_panel->addImage('bpc_chat_bg_image',array('name'=> __('Chat window background image ','apc'),'preview_height' => '48px', 'preview_width' => '64px', 'desc' => __('','apc')));

			$options_panel->addRadio(

				'bpc_chat_bg_pattern',

				array(

					'bg0'=>'<img class="bpc-radio-image" src="'.TOMLIVECHAT_URL.'images/bg/bg0.png" />',

					'bg1'=>'<img class="bpc-radio-image" src="'.TOMLIVECHAT_URL.'images/bg/bg1.png" />',

					'bg2'=>'<img class="bpc-radio-image" src="'.TOMLIVECHAT_URL.'images/bg/bg2.png" />',

					'bg3'=>'<img class="bpc-radio-image" src="'.TOMLIVECHAT_URL.'images/bg/bg3.png" />',

					'bg4'=>'<img class="bpc-radio-image" src="'.TOMLIVECHAT_URL.'images/bg/bg4.png" />',

					'bg5'=>'<img class="bpc-radio-image" src="'.TOMLIVECHAT_URL.'images/bg/bg5.png" />',

					'bg6'=>'<img class="bpc-radio-image" src="'.TOMLIVECHAT_URL.'images/bg/bg6.png" />',

					'bg7'=>'<img class="bpc-radio-image" src="'.TOMLIVECHAT_URL.'images/bg/bg7.png" />',

					'bg8'=>'<img class="bpc-radio-image" src="'.TOMLIVECHAT_URL.'images/bg/bg8.png" />',

					'bg9'=>'<img class="bpc-radio-image" src="'.TOMLIVECHAT_URL.'images/bg/bg9.png" />',

					'bg10'=>'<img class="bpc-radio-image" src="'.TOMLIVECHAT_URL.'images/bg/bg10.png" />',

					'bg11'=>'<img class="bpc-radio-image" src="'.TOMLIVECHAT_URL.'images/bg/bg11.png" />',

					'bg12'=>'<img class="bpc-radio-image" src="'.TOMLIVECHAT_URL.'images/bg/bg12.png" />',

					'bg13'=>'<img class="bpc-radio-image" src="'.TOMLIVECHAT_URL.'images/bg/bg13.png" />',

					'bg14'=>'<img class="bpc-radio-image" src="'.TOMLIVECHAT_URL.'images/bg/bg14.png" />',

					'bg15'=>'<img class="bpc-radio-image" src="'.TOMLIVECHAT_URL.'images/bg/bg15.png" />',

					'bg16'=>'<img class="bpc-radio-image" src="'.TOMLIVECHAT_URL.'images/bg/bg16.png" />',

					'bg17'=>'<img class="bpc-radio-image" src="'.TOMLIVECHAT_URL.'images/bg/bg17.png" />',

					'bg18'=>'<img class="bpc-radio-image" src="'.TOMLIVECHAT_URL.'images/bg/bg18.png" />',

					'bg19'=>'<img class="bpc-radio-image" src="'.TOMLIVECHAT_URL.'images/bg/bg19.png" />',

					'bg20'=>'<img class="bpc-radio-image" src="'.TOMLIVECHAT_URL.'images/bg/bg20.png" />',

					'bg21'=>'<img class="bpc-radio-image" src="'.TOMLIVECHAT_URL.'images/bg/bg21.png" />',

					'bg22'=>'<img class="bpc-radio-image" src="'.TOMLIVECHAT_URL.'images/bg/bg22.png" />',

					'bg23'=>'<img class="bpc-radio-image" src="'.TOMLIVECHAT_URL.'images/bg/bg23.png" />',

					'bg24'=>'<img class="bpc-radio-image" src="'.TOMLIVECHAT_URL.'images/bg/bg24.png" />',

					'bg25'=>'<img class="bpc-radio-image" src="'.TOMLIVECHAT_URL.'images/bg/bg25.png" />',

					'bg26'=>'<img class="bpc-radio-image" src="'.TOMLIVECHAT_URL.'images/bg/bg26.png" />',

					'bg27'=>'<img class="bpc-radio-image" src="'.TOMLIVECHAT_URL.'images/bg/bg27.png" />',

					'bg28'=>'<img class="bpc-radio-image" src="'.TOMLIVECHAT_URL.'images/bg/bg28.png" />',

					'bg29'=>'<img class="bpc-radio-image" src="'.TOMLIVECHAT_URL.'images/bg/bg29.png" />',

					'bg30'=>'<img class="bpc-radio-image" src="'.TOMLIVECHAT_URL.'images/bg/bg30.png" />',

					'bg31'=>'<img class="bpc-radio-image" src="'.TOMLIVECHAT_URL.'images/bg/bg31.png" />',

					'bg32'=>'<img class="bpc-radio-image" src="'.TOMLIVECHAT_URL.'images/bg/bg32.png" />',

					'none'=>'none',

				),

				array(

					'name'=> __('Chat window background Pattern','apc'),

					'std'=> array('none'), 

					'desc' => __('Select Chat window background Pattern','apc')

				)

			);

			$options_panel->addColor('bpc_placeholder_text_color',array('name'=> __('Start Chat text color','apc'), 'std' => '', 'desc' => __('','apc')));

			

			$options_panel->addColor('bpc_start_chat_bg_color',array('name'=> __('Start Chat background color','apc'), 'std' => '', 'desc' => __('','apc')));

			$options_panel->addColor('bpc_start_chat_bdr_color',array('name'=> __('Start Chat border color','apc'), 'std' => '', 'desc' => __('','apc')));

			$options_panel->addColor('bpc_chat_text_color',array('name'=> __('Chat box text color ','apc'), 'std' => '', 'desc' => __('','apc')));

			$options_panel->addColor('bpc_chatbox_bg_color',array('name'=> __('Chat box background color ','apc'), 'std' => '', 'desc' => __('','apc')));



			$options_panel->addCheckbox('enable_bpc_chatbox_bg_opacity',array('name'=> __('Transparent chat background?','apc'), 'std' => false, 'desc' => __('Enable if you want transparent chat background.','apc')));

			//min numeric value

			$options_panel->addText('bpc_chatbox_bg_opacity',

			array(

			  'name'     => __('Set background opacity ','apc'),

			  'std'      => .1,

			  'desc'     => __("Value must be between 0-1 (Example: .4, .5, .6 .7). Default: .5",'apc'),

			  'validate' => array(

				  'minvalue' => array('param' => 0,'message' => __("Must be numeric with a min value of 0",'apc'))

			  ),

			  'validate' => array(

				  'maxvalue' => array('param' => 1,'message' => __("Must be numeric with a Max value of 1",'apc'))

			  )

			)

			);

			

			//$options_panel->addParagraph(__("This is a simple paragraph","apc"));

			//text field

			//$options_panel->addText('text_field_id', array('name'=> __('My Text ','apc'), 'std'=> 'text', 'desc' => __('Simple text field description','apc')));

			//textarea field

			//$options_panel->addTextarea('textarea_field_id',array('name'=> __('My Textarea ','apc'), 'std'=> 'textarea', 'desc' => __('Simple textarea field description','apc')));

			//checkbox field

			

			//select field

			//$options_panel->addSelect('select_field_id',array('selectkey1'=>'Select Value1','selectkey2'=>'Select Value2'),array('name'=> __('My select ','apc'), 'std'=> array('selectkey2'), 'desc' => __('Simple select field description','apc')));

			//radio field

			

			/**

			* Close first tab

			*/   

			$options_panel->CloseTab();

			

			

			/**

			* Open admin page Second tab

			*/

			$options_panel->OpenTab('options_2');

			/**

			* Add fields to your admin page 2nd tab

			* 

			* Fancy options:

			*  typography field

			*  image uploader

			*  Pluploader

			*  date picker

			*  time picker

			*  color picker

			*/

			//title

			$options_panel->Title(__('Refresh Options','apc'));

			

			//is_numeric

			$options_panel->addText('chat_refresh_rate',

			array(

			  'name'     => __('Chat message refresh rate ','apc'),

			  'std'      => 2000,

			  'desc'     => __("Value is in millisecond (1000 ms = 1 sec). Default: 5000 ","apc"),

			  'validate' => array(

				  'numeric' => array('param' => '','message' => __("must be numeric value","apc"))

			  )

			)

			);


			//is_numeric

			$options_panel->addText('friend_list_refresh_rate',

			array(

			  'name'     => __('Friend list refresh rate ','apc'),

			  'std'      => 3000,

			  'desc'     => __("Value is in millisecond (1000 ms = 1 sec). Default: 30000 ","apc"),

			  'validate' => array(

				  'numeric' => array('param' => '','message' => __("must be numeric value","apc"))

			  )

			)

			);

			//Typography field

			//$options_panel->addTypo('typography_field_id',array('name' => __("My Typography","apc"),'std' => array('size' => '14px', 'color' => '#000000', 'face' => 'arial', 'style' => 'normal'), 'desc' => __('Typography field description','apc')));

			//Image field

			//$options_panel->addImage('image_field_id',array('name'=> __('My Image ','apc'),'preview_height' => '120px', 'preview_width' => '440px', 'desc' => __('Simple image field description','apc')));

			//PLupload field

			//$options_panel->addPlupload('plupload_field_ID',array('name' => __('PlUpload Field','apc'), 'multiple' => true, 'desc' => __('Simple multiple image field description','apc')));  

			//date field

			//$options_panel->addDate('date_field_id',array('name'=> __('My Date ','apc'), 'desc' => __('Simple date picker field description','apc')));

			//Time field

			//$options_panel->addTime('time_field_id',array('name'=> __('My Time ','apc'), 'desc' => __('Simple time picker field description','apc')));

			

			

			/**

			* Close second tab

			*/ 

			$options_panel->CloseTab();

			

			

			

			/**

			* Open admin page 3rd tab

			*/

			$options_panel->OpenTab('options_3');

			/**

			* Add fields to your admin page 3rd tab

			* 

			* Editor options:

			*   WYSIWYG (tinyMCE editor)

			*  Syntax code editor (css,html,js,php)

			*/

			//title

			$options_panel->Title(__("Database Options","apc"));

			

			$options_panel->addCheckbox('enable_chat_cleanup',array('name'=> __('Delete database chat history? ','apc'), 'std' => false, 'desc' => __('Enable this to delete chat history from database','apc')));

			

			$options_panel->addRadio(

				'chat_cleanup_interval',

				array(

					'every_three_minutes'=>'Every 3 Minutes',

					'every_five_minutes'=>'Every 5 Minutes',

					'every_ten_minutes'=>'Every 10 Minutes',

					'every_fifteen_minutes'=>'Every 15 Minutes',

					'hourly'=>'Once hourly',

					'twicedaily'=>'Twice daily',

					'daily'=>'Once daily',

					'weekly'=>'Once weekly',

					'monthly'=>'Once Monthly',

					'yearly'=>'Once Yearly',

				),

				array(

					'name'=> __('Database cleanup interval','apc'),

					'std'=> array('twicedaily'), 

					'desc' => __('Select Chat cleanup interval from database','apc')

				)

			);

			

			//wysiwyg field

			//$options_panel->addWysiwyg('wysiwyg_field_id',array('name'=> __('My wysiwyg Editor ','apc'), 'desc' => __('wysiwyg field description','apc')));

			//code editor field

			//$options_panel->addCode('code_field_id',array('name'=> __('Code Editor ','apc'),'syntax' => 'php', 'desc' => __('code editor field description','apc')));

			/**

			* Close 3rd tab

			*/ 

			$options_panel->CloseTab();

			

			

			/**

			* Open admin page 4th tab

			*/

			

			$options_panel->OpenTab('options_4');

			

			/**

			* Add fields to your admin page 4th tab

			* 

			* WordPress Options:

			*   Taxonomies dropdown

			*  posts dropdown

			*  Taxonomies checkboxes list

			*  posts checkboxes list

			*  

			*/

			//title

			$options_panel->Title(__("BuddyPress Options","apc"));

			//taxonomy select field

			$options_panel->addCheckbox('only_bp_friend',array('name'=> __('BuddyPress friend only? ','apc'), 'std' => false, 'desc' => __('If your website is BuddyPress based and want to enable chat only between friends then enable this.','apc')));

			$options_panel->addCheckbox('show_bpc_friend_count',array('name'=> __('Show member number? ','apc'), 'std' => true, 'desc' => __('Turn it off if you do not want to show number of user of your site.','apc')));

			//$options_panel->addTaxonomy('taxonomy_field_id',array('taxonomy' => 'category'),array('name'=> __('My Taxonomy Select','apc'),'class' => 'no-fancy','desc' => __('This field has a <pre>.no-fancy</pre> class which disables the fancy select2 functions','apc') ));

			//posts select field

			//$options_panel->addPosts('posts_field_id',array('args' => array('post_type' => 'post')),array('name'=> __('My Posts Select','apc'), 'desc' => __('posts select field description','apc')));

			//Roles select field

			//$options_panel->addRoles('roles_field_id',array(),array('name'=> __('My Roles Select','apc'), 'desc' => __('roles select field description','apc')));

			//taxonomy checkbox field

			//$options_panel->addTaxonomy('taxonomy2_field_id',array('taxonomy' => 'category','type' => 'checkbox_list'),array('name'=> __('My Taxonomy Checkboxes','apc'), 'desc' => __('taxonomy checkboxes field description','apc')));

			//posts checkbox field

			//$options_panel->addPosts('posts2_field_id',array('post_type' => 'post','type' => 'checkbox_list'),array('name'=> __('My Posts Checkboxes','apc'), 'class' => 'no-toggle','desc' => __('This field has a <pre>.no-toggle</pre> class which disables the fancy Iphone like toggle','apc')));

			//Roles checkbox field

			//$options_panel->addRoles('roles2_field_id',array('type' => 'checkbox_list' ),array('name'=> __('My Roles Checkboxes','apc'), 'desc' => __('roles checboxes field description','apc')));

			

			

			/**

			* Close 4th tab

			*/

			

			$options_panel->CloseTab();

			

			/**

			* Open admin page 5th tab

			*/

			$options_panel->OpenTab('options_5');

			//title

			$options_panel->Title(__("Custom Style","apc"));

			$options_panel->addCode('bpc_custom_style',array('name'=> __('Custom CSS Style Editor ','apc'),'syntax' => 'css', 'desc' => __('','apc')));

			//sortable field

			//$options_panel->addSortable('sortable_field_id',array('1' => 'One','2'=> 'Two', '3' => 'three', '4'=> 'four'),array('name' => __('My Sortable Field','apc'), 'desc' => __('Sortable field description','apc')));

			

			/*

			* To Create a reapeater Block first create an array of fields

			* use the same functions as above but add true as a last param

			

			$repeater_fields[] = $options_panel->addText('re_text_field_id',array('name'=> __('My Text ','apc')),true);

			$repeater_fields[] = $options_panel->addTextarea('re_textarea_field_id',array('name'=> __('My Textarea ','apc')),true);

			$repeater_fields[] = $options_panel->addImage('image_field_id',array('name'=> __('My Image ','apc')),true);

			$repeater_fields[] = $options_panel->addCheckbox('checkbox_field_id',array('name'=> __('My Checkbox  ','apc')),true);

			*/

			/*

			* Then just add the fields to the repeater block

			*/

			//repeater block

			//$options_panel->addRepeaterBlock('re_',array('sortable' => true, 'inline' => true, 'name' => __('This is a Repeater Block','apc'),'fields' => $repeater_fields, 'desc' => __('Repeater field description','apc')));

			

			/**

			* To Create a Conditional Block first create an array of fields (just like a repeater block

			* use the same functions as above but add true as a last param

			

			$Conditinal_fields[] = $options_panel->addText('con_text_field_id',array('name'=> __('My Text ','apc')),true);

			$Conditinal_fields[] = $options_panel->addTextarea('con_textarea_field_id',array('name'=> __('My Textarea ','apc')),true);

			$Conditinal_fields[] = $options_panel->addImage('con_image_field_id',array('name'=> __('My Image ','apc')),true);

			$Conditinal_fields[] = $options_panel->addCheckbox('con_checkbox_field_id',array('name'=> __('My Checkbox  ','apc')),true);

			*/

			/**

			* Then just add the fields to the repeater block

			

			//conditinal block 

			$options_panel->addCondition('conditinal_fields',

			  array(

				'name'   => __('Enable conditinal fields? ','apc'),

				'desc'   => __('<small>Turn ON if you want to enable the <strong>conditinal fields</strong>.</small>','apc'),

				'fields' => $Conditinal_fields,

				'std'    => false

			  ));

			*/

			/**

			* Close 5th tab

			*/

			$options_panel->CloseTab();

			

			

			/**

			* Open admin page 6th tab

			* field validation 

			* `email`            => validate email

			* `alphanumeric`     => validate alphanumeric

			* `url`              => validate url

			* `length`           => check for string length

			* `maxlength`        => check for max string length

			* `minlength`        => check for min string length

			* `maxvalue`         => check for max numeric value

			* `minvalue`         => check for min numeric value

			* `numeric`          => check for numeric value

			*/

			

			$options_panel->OpenTab('options_6');

			

			$options_panel->addText('bpc_lg_member_list', array('name'=> __('Member List','apc'), 'std'=> 'Member List', 'desc' => __('','apc')));

			$options_panel->addText('bpc_lg_members', array('name'=> __('Members','apc'), 'std'=> 'Members', 'desc' => __('','apc')));

			$options_panel->addText('bpc_lg_friends', array('name'=> __('Friends','apc'), 'std'=> 'Friends', 'desc' => __('','apc')));

			$options_panel->addText('bpc_lg_search_friends', array('name'=> __('Search friends','apc'), 'std'=> 'SEARCH', 'desc' => __('','apc')));			

			$options_panel->addText('bpc_lg_start_chat', array('name'=> __('Start Chat','apc'), 'std'=> 'Start Chat', 'desc' => __('','apc')));

			

			$options_panel->addText('bpc_lg_refresh', array('name'=> __('Refresh','apc'), 'std'=> 'Refresh', 'desc' => __('','apc')));

			$options_panel->addText('bpc_lg_monline', array('name'=> __('Members online','apc'), 'std'=> 'Members online', 'desc' => __('','apc')));

			$options_panel->addText('bpc_lg_fonline', array('name'=> __('Friends online','apc'), 'std'=> 'Friends online', 'desc' => __('','apc')));

			$options_panel->addText('bpc_lg_glist', array('name'=> __('Group List','apc'), 'std'=> 'Group List', 'desc' => __('','apc')));

			

			$options_panel->addText('bpc_lg_no_result', array('name'=> __('No results','apc'), 'std'=> 'No results', 'desc' => __('','apc')));

			$options_panel->addText('bpc_lg_no_friends', array('name'=> __('There are no friends','apc'), 'std'=> 'There are no friends', 'desc' => __('','apc')));

			$options_panel->addText('bpc_lg_nof_online', array('name'=> __('No friends online','apc'), 'std'=> 'No friends online', 'desc' => __('','apc')));

			$options_panel->addText('bpc_lg_nom_online', array('name'=> __('No member online','apc'), 'std'=> 'No member online.', 'desc' => __('','apc')));

			$options_panel->addText('bpc_lg_not_member', array('name'=> __('You are not a member of any group.','apc'), 'std'=> 'You are not a member of any group.', 'desc' => __('','apc')));



			/**

			* Close 6th tab There are no friends.

			*/

			$options_panel->CloseTab();

			

			/**

			* Open admin page 7th tab

			*/

			$options_panel->OpenTab('options_7');

			

			//title

			$options_panel->Title(__("Import Export","apc"));

			

			/**

			* add import export functionallty

			*/

			$options_panel->addImportExport();

			

			/**

			* Close 7th tab

			*/

			$options_panel->CloseTab();

			$options_panel->CloseTab();

			

			//Now Just for the fun I'll add Help tabs

			/*

			$options_panel->HelpTab(array(

			'id'      =>'tab_id',

			'title'   => __('My help tab title','apc'),

			'content' =>'<p>'.__('This is my Help Tab content','apc').'</p>'

			));			

			*/

		}

	

	}

	new tomsoclivechatOptions();

}



?>