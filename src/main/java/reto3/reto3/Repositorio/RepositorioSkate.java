/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package reto3.reto3.Repositorio;

import reto3.reto3.Entidad.Skate;
import reto3.reto3.Interfaz.InterfaceSkate;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

/**
 *
 * @author calix
 */
@Repository

public class RepositorioSkate {
    @Autowired
    private InterfaceSkate crud;
    
    public List<Skate> getAll(){
        return (List<Skate>) crud.findAll();
        
    }
    
    public Optional<Skate> getSkate(int id){
        return crud.findById(id);
        
    }
    
    public Skate save(Skate skate){
        return crud.save(skate);
    }
    
    //DELETE
    public void delete(Skate skate){
        crud.delete(skate);
    }
}
