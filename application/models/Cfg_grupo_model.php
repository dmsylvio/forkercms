<?php
defined('BASEPATH') OR exit('No direct script access allowed');
 
/**
 * Cfg_grupo_model class.
 * 
 * @extends CI_Model
 */
class Cfg_grupo_model extends CI_Model{
    
    /*
     * Get cfg_grupo by id_cfg_grupo
     */
    function get_cfg_grupo($id_cfg_grupo)
    {
        return $this->db->get_where('cfg_grupo',array('id_cfg_grupo'=>$id_cfg_grupo))->row_array();
    }
        
    /*
     * Get all cfg_grupo
     */
    function get_all_cfg_grupo()
    {
        $this->db->order_by('id_cfg_grupo', 'desc');
        return $this->db->get('cfg_grupo')->result_array();
    }
        
    /*
     * function to add new cfg_grupo
     */
    function add_cfg_grupo($params)
    {
        $this->db->insert('cfg_grupo',$params);
        return $this->db->insert_id();
    }
    
    /*
     * function to update cfg_grupo
     */
    function update_cfg_grupo($id_cfg_grupo,$params)
    {
        $this->db->where('id_cfg_grupo',$id_cfg_grupo);
        return $this->db->update('cfg_grupo',$params);
    }
    
    /*
     * function to delete cfg_grupo
     */
    function delete_cfg_grupo($id_cfg_grupo)
    {
        return $this->db->delete('cfg_grupo',array('id_cfg_grupo'=>$id_cfg_grupo));
    }
}