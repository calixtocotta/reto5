/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package reto3.reto3.Servicios;

import reto3.reto3.Repositorio.RepositorioCategory;
import reto3.reto3.Entidad.Category;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class serviciosCategory {
     @Autowired
    private RepositorioCategory metodosCrud;
    
    public List<Category> getAll(){
         return metodosCrud.getAll();
    }
    
    public Optional<Category> getCategory(int id){
        return metodosCrud.getCategory(id);
    }
    
    
    public Category save(Category category){
        if(category.getId()==null){
            return metodosCrud.save(category);
        }else{
            Optional<Category> evt=metodosCrud.getCategory(category.getId());
            if(evt.isEmpty()){
            return metodosCrud.save(category);
            }else{
                return category;
            }
        
        
        }
    
    }
    
        public Category update(Category category){
        if(category.getId()!=null){
            return metodosCrud.save(category);
        }else{
            Optional<Category> e=metodosCrud.getCategory(category.getId());
            if(!e.isEmpty()){
                if(category.getName()!=null){
                    e.get().setName(category.getName());
                }
                if(category.getDescription()!=null){
                    e.get().setDescription(category.getDescription());
                }
                if(category.getSkates()!=null){
                    e.get().setSkates(category.getSkates());
                }
                return e.get();
            }else{
                return category;
            }
        }
    }
    
    public boolean deleteCategory(int id){
      Boolean aBoolean=getCategory(id).map(category -> {
            metodosCrud.delete(category);
            return true;
        }).orElse(aBoolean=false);
       return aBoolean;
    }
}
