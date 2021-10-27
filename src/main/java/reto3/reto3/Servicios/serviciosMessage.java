/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package reto3.reto3.Servicios;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import reto3.reto3.Entidad.Message;
import reto3.reto3.Repositorio.RepositorioMessage;

@Service
public class serviciosMessage {
     @Autowired
    private RepositorioMessage metodosCrud;
    
    public List<Message> getAll(){
         return metodosCrud.getAll();
    }
    
    public Optional<Message> getMessage(int id){
        return metodosCrud.getMessage(id);
    }
    
    
    public Message save(Message message){
        if(message.getIdMessage()==null){
            return metodosCrud.save(message);
        }else{
            Optional<Message> evt=metodosCrud.getMessage(message.getIdMessage());
            if(evt.isEmpty()){
            return metodosCrud.save(message);
            }else{
                return message;
            }
        
        
        }
    
    }
    
    public Message update(Message message){
        if(message.getIdMessage()==null){
            return metodosCrud.save(message);
        }else{
            Optional<Message> e=metodosCrud.getMessage(message.getIdMessage());
            if(!e.isEmpty()){
                if(message.getMessageText()!=null){
                    e.get().setMessageText(message.getMessageText());
                }
                if(message.getClient()!=null){
                    e.get().setClient(message.getClient());
                }
                if(message.getSkate()!=null){
                    e.get().setSkate(message.getSkate());
                }
                
                return e.get();
            }else{
                return message;
            }
        }
    }
    
    public boolean deleteMessage(int id){
        
        
        Boolean aBoolean=getMessage(id).map(message -> {
            metodosCrud.delete(message);
            return true;
        }).orElse(aBoolean=false);
        
        return aBoolean;
    }
}
