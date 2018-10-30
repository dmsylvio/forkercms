<?php
defined('BASEPATH') OR exit('No direct script access allowed');
/**
 * Doth class.
 * 
 * @extends CI_Controller
 */
class Doth extends CI_Controller {

	public function logged_in_check(){
		if (!$this->session->userdata('logged_in')) {
			redirect('login');
		}
	}

	public function index(){
		
		// check if user is logged in
		$this->logged_in_check();
		
		$this->load->view('dashboard/index');
	}
}