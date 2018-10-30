<?php defined('BASEPATH') OR exit('No direct script access allowed');
/**
 * Cfg_user_model class.
 * 
 * @extends CI_Model
 */
class Cfg_user_model extends CI_Model{

	private $_data = array(); 

	public function validate(){

		$email = $this->input->post('email');
		$senha = $this->input->post('senha');

		$this->db->where('email', $email);
		$query = $this->db->get('cfg_user');

		if ($query->num_rows()) {
			
			// found row by username
			$row = $query->row_array();

			// now checks if user is locked
			if ($row['libera'] == 0) {

				// the user is locked
				return ERR_BLOCKED_USER;
			}

			// now check for the password
			if ($row['senha'] == md5($senha)) {

				// we not need password to store in session
				unset($row['senha']);
				$this->_data = $row;
				return ERR_NONE;
			}

			// password not match 
			return ERR_INVALID_PASSWORD;

		}else{
			// not found
			return ERR_INVALID_USERNAME;
		}
	}

	public function get_data(){

		return $this->_data;
	}

	/**
	 * count_users function.
	 * 
	 * @access public
	 * @return int
	 */
	public function count_users(){

		$this->db->select('id_cfg_user');
		$this->db->where('id_cfg_grupo >=', 2);
		$this->db->from('cfg_user');
		return $this->db->get()->num_rows();

	}

	/**
	 * get_cfg_user function.
	 * 
	 * @access public
	 * @return object
	 */
	public function get_cfg_user($limit, $start) {
		
		$this->db->select('cfg_user.id_cfg_user, cfg_user.nome, cfg_user.email, cfg_user.arquivo,
			cfg_user.publica_conteudo, cfg_user.libera, cfg_grupo.cfg_grupo');
		$this->db->from('cfg_user');
		$this->db->join('cfg_grupo', 'cfg_grupo.id_cfg_grupo =  cfg_user.id_cfg_grupo', 'inner');
		$this->db->where('cfg_user.id_cfg_grupo >=', 2);
		$this->db->order_by('cfg_user.id_cfg_user', 'asc');
		$this->db->limit($limit, $start);
		$query = $this->db->get();
        if ($query->num_rows() > 0) {
            
            foreach ($query->result() as $row) {
                
                $data[] = $row;
            }

            return $data;

        }else{

            return NULL;
        }
		
	}

	/**
     * create_cfg_user function.
     * 
     * @access public
     * @param mixed $id_cfg_grupo
     * @param mixed $nome
     * @param mixed $email
     * @param mixed $arquivo
     * @param mixed $senha
     * @param mixed $telefone
     * @param mixed $celular
     * @param mixed $limite_registro
     * @param mixed $publica_conteudo
     * @param mixed $libera
     * @return bool true on success, false on failure
     */
	public function create_cfg_user($id_cfg_grupo, $nome, $email, $arquivo, $senha,
					$telefone, $celular, $limite_registro, $publica_conteudo, $libera, $arquivo){

		$data = array(
            'id_cfg_grupo'      => $id_cfg_grupo,
            'nome'              => $nome,
            'email'             => $email,
            'arquivo'           => $arquivo,
            'senha'             => md5($senha),
            'telefone'          => $telefone,
            'celular'           => $celular,
            'data_cadastro'     => date('Y-m-j H:i:s'),
            'limite_registro'   => $limite_registro,
            'publica_conteudo'  => $publica_conteudo,
            'libera'            => $libera,
        );

        return $this->db->insert('cfg_user', $data);
	}

	/**
	 * update_cfg_user function.
	 * 
	 * @access public
	 * @param int $id_cfg_user
	 * @param array $update_data
	 * @return bool
	 */
	public function update_cfg_user($id_cfg_user, $update_data){

		// if user wants to update its password, hash the given password
		if (array_key_exists('senha', $update_data)) {
			$update_data['senha'] = md5($update_data['senha']);
		}

		if (!empty($update_data)) {

			$this->db->where('id_cfg_user', $id_cfg_user);
			return $this->db->update('cfg_user', $update_data);
		}
		return false;

	}

	public function get_user($id_cfg_user){

		return $this->db->get_where('cfg_user',array('id_cfg_user'=>$id_cfg_user))->row_array();
		 	
	}
	
}