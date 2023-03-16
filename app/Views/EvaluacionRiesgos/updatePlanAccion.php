<?=$this->extend('Layout/main')?> 
<?=$this->section('content')?>

<div class="row">
        <div class="col-12">
            <div class="card">
                <div class="card-body mb-2">
                    <div class="row align-items-center justify-content-between">
                        <div class="col-md-12">                            
                                <h4 class="card-title">Agregar</h4>
                                    <div class="col-md-12" style="margin-top:0.5rem" id="alerta_plan">
                                        
                                    </div>
                                     <form action="" id="form_planAccion" class="in-line">
                                          <input type="hidden" id="id_plan" value="<?php echo $id ?>">
                                          
                                        <div class="col-12-lg">
                                                <div class="row">
                                                      
                                                    <div class="col-lg-3">
                                                          <div class="form-group">
                                                              <span>Riesgo Asociado: </span>
                                                                <select class="js-riesgos-basic-multiple" name="IDR[]" id="IDR" multiple="multiple">
                                                                    <?php foreach ($riesgo as $key => $value) { 
                                                                        echo("<option value='".$value->id."'>".$value->riesgo."</option>");
                                                                    } ?>         
                                                                </select>
                                                          </div>
                                                    </div>

                                                    <div class="col-lg-3">
                                                          <div class="form-group">
                                                              <span>Control Asociado: </span>
                                                              <select class="js-controles-basic-multiple" name="IDC[]" id="IDC" multiple="multiple">
                                                                    <?php foreach ($control as $key => $value) { 
                                                                        echo("<option value='".$value->id."'>".$value->nom_control."</option>");
                                                                    } ?>         
                                                                </select>
                                                          </div>
                                                    </div>
                                            
                                                      
                                                    <div class="col-lg-3">
                                                        <button type="button" id="btnNuevo_control"  class="float-right btn btn-primary waves-effect waves-light"> Nuevo Control</button>
                                                    </div> 
                                                </div>
                                                <div class="row">
                                                            <div class="col-lg-12">
                                                                <h4 class="card-title">   Detalles del Plan</h4>
                                                            </div> 
                                                </div>
                                                <div class="row">
                                                        
                                                        
                                                        <div class="col-lg-6">
                                                            <div class="form-group">  
                                                                                                         
                                                              <input type="text" placeholder="" class="form-control form-control-sm" id="id"  onKeyPress="return soloLetra(event);" disabled>
                                                            </div>
                                                        </div>
                                                          
                                                        <div class="col-lg-6">
                                                            
                                                          
                                                            <input type="text" placeholder="Nombre del plan de accion" class="form-control form-control-sm" id="nombre_plan"  onKeyPress="return soloLetra(event);">
                                                        </div>
                                                   
                                                   

                                                       
                                                </div>
                                                <div class="row">
                                                    <div class="col-lg-6">
                                                          <div class="form-group">
                                                              <span>Descripción del Plan: </span>
                                                              <input type="text" class="form-control form-control-sm" id="descripcion_plan"  onKeyPress="return soloLetra(event);">
                                                          </div>
                                                    </div>
                                                    
                                                    <div class="col-lg-3">
                                                          <div class="form-group">
                                                              <span>Fecha Inicio: </span>
                                                              <input type="date" class="form-control form-control-sm" id="fecha_inicio_plan" >
                                                          </div>
                                                    </div>

                                                    <div class="col-lg-3">
                                                          <div class="form-group">
                                                              <span>Fecha Fin: </span>
                                                              <input type="date" class="form-control form-control-sm" id="fecha_fin_plan" >
                                                          </div>
                                                    </div>

                                                    <div class="col-lg-3">
                                                          <div class="form-group">
                                                            <span>Empresa: </span>
                                                            <select name="" id="id_empresa_pos" class="form-control form-control-sm">
                                                        
                                                            </select>
                                                          </div>

                                                          
                                                    </div>

                                                    <div class="col-lg-3">
                                                          <div class="form-group">
                                                              <span>Area: </span>
                                                              <select name="" id="id_area_pos" class="form-control form-control-sm">
                                                        
                                                            </select>
                                                          </div>

                                                          
                                                    </div>

                                                    <div class="col-lg-3">
                                                          <div class="form-group">
                                                              <span>Unidad: </span>
                                                              <select name="" id="id_unidad_pos" class="form-control form-control-sm">
                                                        
                                                                </select>
                                                          </div>

                                                          
                                                    </div>

                                                    <div class="col-lg-3">
                                                          <div class="form-group">
                                                              <span>Posicion: </span>
                                                              <select name="" id="id_puesto" class="form-control form-control-sm">
                                                              <option value="">Seleccione</option>                                                              
                                                              </select>
                                                          </div>

                                                          
                                                    </div>




                                                    <div class="col-lg-3">
                                                          <div class="form-group">
                                                              <span>Nombre: </span>
                                                              <select name="" id="id_nombre_pos" class="form-control form-control-sm">
                                                              <option value="">Seleccione</option>
                                                              </select>
                                                          </div>

                                                          
                                                    </div>

                                                    <div class="col-lg-3">
                                                          <div class="form-group">
                                                              <span>Prioridad: </span>
                                                              <select name="" id="id_prioridad_pos" class="form-control form-control-sm">
                                                              <option value="">Seleccione</option>
                                                              </select>
                                                          </div>

                                                          
                                                    </div>

                                                    <div class="col-lg-3">
                                                          <div class="form-group">
                                                              <span>Estado: </span>
                                                              <select name="" id="id_estado_pos" class="form-control form-control-sm">
                                                              <option value="">Seleccione</option>
                                                              </select>
                                                          </div>

                                                          
                                                    </div>

                                                    <div class="col-lg-3">
                                                          <div class="form-group">
                                                              <span>Alerta Seguimiento: </span>
                                                              <select name="" id="id_alerta_pos" class="form-control form-control-sm">
                                                              <option value="">Seleccione</option>
                                                              </select>
                                                          </div>

                                                         
                                                          
                                                    </div>

                                                    <div class="col-md-12 d-flex justify-content-center">
                                                            <button type="button" id="btn_crear_plan" class="btn btn-primary">
                                                                <i class="fas fa-plus-circle mr-2"></i>Modificar Plan
                                                            </button>
                                                           
                                                    </div>
                                                    
                                                </div>
                                                    

                                        </div>
                                    </form>
                    
                        </div>
                    </div>
                </div>
                                                       
            </div>
        </div>
              
</div>
        

                        <script src="<?=base_url('public/assets/js/planesAccion/main_das.js'); ?>"></script>   

                       <script src="<?=base_url('public/assets/js/planesAccion/cargarDatosCombo.js'); ?>"></script>   
                       <script src="<?=base_url('public/assets/js/planesAccion/updatePlan.js'); ?>"></script>
                    
               

   
</script>
                            
                                                    
                                                    





<?=$this->endSection()?> 