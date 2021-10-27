/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package reto3.reto3.Servicios;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import reto3.reto3.Entidad.Client;
import reto3.reto3.Repositorio.RepositorioClient;

@Service
public class serviciosClient {
     @Autowired
    private RepositorioClient metodosCrud;
    
    public List<Client> getAll(){
         return metodosCrud.getAll();
    }
    
    public Optional<Client> getClient(int id){
        return metodosCrud.getClient(id);
    }
    
    
    public Client save(Client client){
        if(client.getIdClient()==null){
            return metodosCrud.save(client);
        }else{
            Optional<Client> evt=metodosCrud.getClient(client.getIdClient());
            if(evt.isEmpty()){
            return metodosCrud.save(client);
            }else{
                return client;
            }
        }
    }
    
    public Client update(Client client){
        if(client.getIdClient()==null){
            return metodosCrud.save(client);
        }else{
            Optional<Client> e=metodosCrud.getClient(client.getIdClient());
            if(!e.isEmpty()){
                if(client.getIdClient()!=null){
                    e.get().setIdClient(client.getIdClient());
                }
                if(client.getName()!=null){
                    e.get().setName(client.getName());
                }
                if(client.getEmail()!=null){
                    e.get().setEmail(client.getEmail());
                }
                if(client.getAge()!=null){
                    e.get().setAge(client.getAge());
                }
                if(client.getPassword()!=null){
                    e.get().setPassword(client.getPassword());
                }
                if(client.getMessages()!=null){
                    e.get().setMessages(client.getMessages());
                }
                if(client.getReservations()!=null){
                    e.get().setReservations(client.getReservations());
                }
                metodosCrud.save(e.get());
                return e.get();
            }else{
                return client;
            }
        }
    }
    
    public boolean deleteClient(int id){
        
        Boolean aBoolean=getClient(id).map(client -> {
            metodosCrud.delete(client);
            return true;
        }).orElse(aBoolean=false);
        
        return aBoolean;
    }
}
