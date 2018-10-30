<?php
defined('BASEPATH') OR exit('No direct script access allowed');
/**
 * Cfg_user class.
 * 
 * @extends CI_Controller
 */
class Cfg_user extends CI_Controller {
	/**
	 * __construct function.
	 * 
	 * @access public
	 * @return void
	 */
	public function __construct() {
		
		parent::__construct();
		$this->load->model('Cfg_user_model', 'auth');
		$this->load->model('Cfg_grupo_model');
		$this->load->library('pagination');
		
	}

	public function logged_in_check(){
		if ($this->session->userdata('logged_in')) {
			redirect('/');
		}
	}

	public function index(){
		
		// if the user is not logged, redirect to base url
		if (!$this->session->userdata('logged_in')) {
			redirect('login');
		}

		// create the data object
		$data = new stdClass();

		// create the user object
		$data->count_user = $this->auth->count_users();

		$config = array();
		$config["base_url"] = base_url() . "cfg_user/listar";
		$config["total_rows"] = $this->auth->count_users();
		$config["per_page"] = 20;
		$config["uri_segment"] = 3;
		$config["first_link"] = FALSE;
		$config["last_link"] = FALSE;
		$config["next_link"] = '»';
		$config["prev_link"] = '«';
		$config["cur_tag_open"] = '<a href="javascript:void(0);" class="active">';
		$config["cur_tag_close"] = '</a>';

		$this->pagination->initialize($config);

		$page = ($this->uri->segment(3)) ? $this->uri->segment(3) : 0;
		$data->get_all_users = $this->auth->get_cfg_user($config["per_page"], $page);
		$data->links = $this->pagination->create_links();


		$this->load->view('cfg_user/index', $data);
	}

	/**
	 * inserir function.
	 * 
	 * @access public
	 * @return void
	 */
	public function inserir(){

		// if the user is not logged, redirect to base url
		if (!$this->session->userdata('logged_in')) {
			redirect('login');
		}

		// create the data object
		$data = new stdClass();

		// set validation rules
		$this->form_validation->set_rules('nome','Nome','required');
		$this->form_validation->set_rules('email','Email','required|valid_email|is_unique[cfg_user.email]');
		$this->form_validation->set_rules('senha','Senha','required|min_length[6]');

		// Load all groups
		$data->all_cfg_grupo = $this->Cfg_grupo_model->get_all_cfg_grupo();

		if ($this->form_validation->run() === TRUE) {

			// set variables from the form
			$id_cfg_grupo = $this->input->post('id_cfg_grupo');
			$nome = $this->input->post('nome');
			$email = $this->input->post('email');
			$arquivo = $this->input->post('arquivo');
			$senha = $this->input->post('senha');
			$telefone = $this->input->post('telefone');
			$celular = $this->input->post('celular');
			$limite_registro = $this->input->post('limite_registro');
			$publica_conteudo = $this->input->post('publica_conteudo');
			$libera = $this->input->post('libera');


			$path = '../upload/cfg_user/'.date('Y').'/'.date('m').'/';

			if (!is_dir($path)) {
				mkdir($path, 0755, TRUE);
			}

			//Foto do Autor(a)
			if (isset($_FILES['arquivo']['name']) && !empty($_FILES['arquivo']['name'])) {
				
				// setup upload configuration and load upload library
				$config['upload_path']      = $path;
				$config['allowed_types']    = 'gif|jpg|png';
				$config['max_size']         = 3072;
				$config['max_width']        = 5000;
				$config['max_height']       = 5000;
				$config['file_ext_tolower'] = true;
				$config['encrypt_name']     = true;			
				$this->load->library('upload', $config);
				
				if (!$this->upload->do_upload('arquivo')) {
					
					// upload NOT ok
					$error = array('error' => $this->upload->display_errors());
					//$this->load->view('upload_form', $error);

					$arquivo = '';

				} else {
					
					// Upload ok send name to $updated_data
					$arquivo = date('Y').'/'.date('m').'/'.$this->upload->data('file_name');
					
				}
				
			}

			if ($this->auth->create_cfg_user($id_cfg_grupo, $nome, $email, $arquivo, $senha,
				$telefone, $celular, $limite_registro, $publica_conteudo, $libera, $arquivo)) {

				// sucess
				$this->session->set_flashdata('sucess', 'Usuário cadastrado com sucesso!');

			}else{

				// user creation failed, this should never happen
				$this->session->set_flashdata('error', 'There was a problem creating your new account. Please try again.');
			}

		}

		// Load the view
		$this->load->view('cfg_user/inserir', $data);

	}

	/**
	 * editar function.
	 * 
	 * @access public
	 * @param mixed $id_cfg_user
	 * @return void
	 */
	public function editar($id_cfg_user){

		// if the user is not logged, redirect to base url
		if (!$this->session->userdata('logged_in')) {
			redirect('login');
		}

		// create the data object
		$data = new stdClass();

		// set validation rules
		$this->form_validation->set_rules('nome','Nome','required');
		$this->form_validation->set_rules('email', 'Email', 'required|trim|valid_email');

		// Load all groups
		$data->all_cfg_grupo = $this->Cfg_grupo_model->get_all_cfg_grupo();

		// checks whether the user exists
		// if there is display screen for editing
		// if there is no return to list of users
		$data->cfg_user = $this->auth->get_user($id_cfg_user);

		if ($this->auth->get_user($id_cfg_user) !== null) {

			if ($this->form_validation->run() === false) {
				
				// validation not ok, send validation errors to the view
				$this->load->view('cfg_user/editar', $data);

			}else{

				// set variables from the form
				$update_data = [];
				if ($this->input->post('id_cfg_grupo') != '') {
					$update_data['id_cfg_grupo'] = $this->input->post('id_cfg_grupo');
				}
				if ($this->input->post('nome') != '') {
					$update_data['nome'] = $this->input->post('nome');
				}
				if ($this->input->post('email') != '') {
					$update_data['email'] = $this->input->post('email');
				}
				if ($this->input->post('senha') != '') {
					$update_data['senha'] = $this->input->post('senha');
				}
				if ($this->input->post('telefone') != '') {
					$update_data['telefone'] = $this->input->post('telefone');
				}
				if ($this->input->post('celular') != '') {
					$update_data['celular'] = $this->input->post('celular');
				}
				if ($this->input->post('limite_registro') != '') {
					$update_data['limite_registro'] = $this->input->post('limite_registro');
				}
				if ($this->input->post('publica_conteudo') != '') {
					$update_data['publica_conteudo'] = $this->input->post('publica_conteudo');
				}
				if ($this->input->post('libera') != '') {
					$update_data['libera'] = $this->input->post('libera');
				}

				$path = '../upload/cfg_user/'.date('Y').'/'.date('m').'/';

				if (!is_dir($path)) {
					mkdir($path, 0755, TRUE);
				}

				// Update Autor photo
				if (isset($_FILES['arquivo']['name']) && !empty($_FILES['arquivo']['name'])) {
					
					// setup upload configuration and load upload library
					$config['upload_path']      = $path;
					$config['allowed_types']    = 'gif|jpg|png';
					$config['max_size']         = 3072;
					$config['max_width']        = 5000;
					$config['max_height']       = 5000;
					$config['file_ext_tolower'] = true;
					$config['encrypt_name']     = true;			
					$this->load->library('upload', $config);
					
					if (!$this->upload->do_upload('arquivo')) {
						
						// upload NOT ok
						$error = array('error' => $this->upload->display_errors());
						//$this->load->view('upload_form', $error);

					} else {
						
						// Upload ok send name to $updated_data
						$update_data['arquivo'] = date('Y').'/'.date('m').'/'.$this->upload->data('file_name');
						
					}
					
				}

				if ($this->auth->update_cfg_user($id_cfg_user, $update_data)) {

					// sucess
					redirect('cfg_user', 'refresh');

				}else{

					// user creation failed, this should never happen
					$this->session->set_flashdata('error', 'Houve um problema ao atualizar o usuário. Tente novamente mais tarde.');

					// Load the view
					$this->load->view('cfg_user/editar', $data);
				}
			}

		}else{

			redirect('cfg_user', 'refresh');
		}

		

	}

	/**
	 * login function.
	 * 
	 * @access public
	 * @return void
	 */
	public function login(){

		// check if user is logged in
		$this->logged_in_check();

		// set validation rules
		$this->form_validation->set_rules('email', 'E-mail', 'trim|required|valid_email');
		$this->form_validation->set_rules('senha', 'Senha', 'trim|required|min_length[6]');

		if ($this->form_validation->run() == TRUE) {
			
			// check the username & password of user
			$status = $this->auth->validate();
			if ($status == ERR_INVALID_USERNAME) {
				$this->session->set_flashdata('error', 'E-mail inválido.');
			}elseif ($status == ERR_INVALID_PASSWORD) {
				$this->session->set_flashdata('error', 'Senha inválida.');
			}elseif($status == ERR_BLOCKED_USER){
				$this->session->set_flashdata('error', 'Seu Usuário foi bloqueado.');
			}else{

				// sucess
				// store the user data to session
				$this->session->set_userdata($this->auth->get_data());
				$this->session->set_userdata('logged_in', TRUE);

				// redirect to dashboard
				redirect('/');
			}
		}

		$this->load->view('cfg_user/login');
	}

	/**
	 * logout function.
	 * 
	 * @access public
	 * @return void
	 */
	public function logout(){

		if ($this->session->userdata('logged_in')) {

			// remove session datas
			$this->session->unset_userdata('logged_in');
			$this->session->sess_destroy();
			redirect('login','refresh');

		}else{

			// there user was not logged in, we cannot logged him out,
			// redirect him to site root
			redirect('/');

		}
	}




}