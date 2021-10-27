
package reto3.reto3.Repositorio;

import reto3.reto3.Entidad.Message;
import reto3.reto3.Interfaz.interfaceMessage;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class RepositorioMessage {
     @Autowired
    private interfaceMessage crud;
    
    public List<Message> getAll(){
        return (List<Message>) crud.findAll();
    }
    
    public Optional <Message> getMessage(int id){
        return crud.findById(id);
    }
    
    public Message save(Message message ){
        return crud.save(message);
    }
    
     //DELETE
    public void delete(Message message){
        crud.delete(message);
    }
    
}
