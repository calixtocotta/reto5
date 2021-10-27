/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package reto3.reto3.ControladorWeb;

import reto3.reto3.Servicios.serviciosSkate;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import reto3.reto3.Entidad.Skate;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMethod;

@CrossOrigin(origins = "*", methods = {RequestMethod.GET,RequestMethod.POST,RequestMethod.PUT,RequestMethod.DELETE})
@RestController
@RequestMapping("/api/Skate")
public class SkateWeb {
    @GetMapping("/HolaMundo")
    
    public String saludar(){
        return "Hola mundo Tutorias";
    }
    
    @Autowired
    private serviciosSkate servicios;
    @GetMapping("/all")
    public List<Skate> getSkate(){
        return servicios.getAll();
    }
    
    @GetMapping("/{id}")
    public Optional<Skate> getSkate(@PathVariable("id") int id){
        return servicios.getSkate(id);
    }
    
    @PostMapping("/save")
    @ResponseStatus(HttpStatus.CREATED)
    public Skate save(@RequestBody Skate skate){
        return servicios.save(skate);
    }
    
    @PutMapping("/update")
    @ResponseStatus(HttpStatus.CREATED)
    public Skate update(@RequestBody Skate skate){
        return servicios.update(skate);
    }
    
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public boolean delete(@PathVariable("id") int Id){
        return servicios.deleteSkate(Id);
    }
}
