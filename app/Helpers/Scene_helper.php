<?php 

function updateScene($user_id){
    $post_endpoint = '/api/getUser/'.$user_id;
    $response = perform_http_request('GET',REST_API_URL.$post_endpoint,[]);
    if($response){
        // var_dump($response);die();
        $_SESSION['escenario'] = $response->datos->escenario;
    }
}