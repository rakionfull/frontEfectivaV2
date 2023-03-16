<?php

namespace App\Controllers;

use App\Controllers\BaseController;

class DefinicionController extends BaseController
{
     //DEfinciion
     public function getDefinicion(){
        if($this->session->logged_in){
          $get_endpoint = '/api/getDefinicion';

          $response =perform_http_request('GET', REST_API_URL . $get_endpoint,[]);
          if($response){
          
            echo json_encode($response);
          }
        }
    }
     //agregar Definicion
     public function addDefinicion(){
        if($this->session->logged_in){
            if(!$this->request->getPost())
            {
              return redirect()->to(base_url('/controles'));
            }else{
          
                $post_endpoint = '/api/addDefinicion';
        
                $request_data =
                $request_data = [
                    $this->request->getPost(),
                    'user' =>$this->session->id
                ];
               
                $response = (perform_http_request('POST', REST_API_URL . $post_endpoint,$request_data));
              
                
                  if($response){
                      echo json_encode($response);
                  
                  }else{
                    echo json_encode(false);
                  }
             
              
            }
          }
         
    }
    public function updateDefinicion() {
       
        if($this->session->logged_in){
          if(!$this->request->getPost())
          {
            return redirect()->to(base_url('/controles'));
          }else{
        
              $post_endpoint = '/api/updateDefinicion';
              $request_data = [
                $this->request->getPost(),
                'user' =>$this->session->id
              ];
             
              $response = (perform_http_request('POST', REST_API_URL . $post_endpoint,$request_data));
              // var_dump($response);
              
                if($response){
                    echo json_encode($response);
                
                }else{
                  echo json_encode(false);
                }

          }
        }
       
         
    }
    public function deleteDefinicion(){
        if($this->session->logged_in){
    
            $post_endpoint = '/api/deleteDefinicion';
         
            $request_data = [ $this->request->getPost(),  'user' =>$this->session->id];

            $response = (perform_http_request('DELETE', REST_API_URL . $post_endpoint,$request_data));
            echo json_encode($response);
            
        
        }
    }
}