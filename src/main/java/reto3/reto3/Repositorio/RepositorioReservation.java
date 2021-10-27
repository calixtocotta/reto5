
package reto3.reto3.Repositorio;

import java.util.ArrayList;
import java.util.Date;
import reto3.reto3.Entidad.Reservation;
import reto3.reto3.Interfaz.interfaceReservation;
import java.util.List;
import java.util.Optional;
import org.hibernate.annotations.common.util.impl.Log;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import reto3.reto3.ControladorWeb.custom.CountClient;
import reto3.reto3.Entidad.Client;

@Repository
public class RepositorioReservation {
    @Autowired
    private interfaceReservation crud;
    
    public List<Reservation> getAll(){
        return (List<Reservation>) crud.findAll();
    }
    
    public Optional <Reservation> getReservation(int id){
        return crud.findById(id);
    }
    
    public Reservation save(Reservation reservation ){
        return crud.save(reservation);
    }
    
    //DELETE
    public void delete(Reservation reservation){
        crud.delete(reservation);
    }
    
    public List<Reservation> getReservationByStatus(String Status){
        return crud.findAllByStatus(Status);
    }
    
    public List<Reservation> getReservationByPeriod(Date dateOne, Date dateTwo){
        return crud.findAllByStartDateAfterAndStartDateAfter(dateOne, dateTwo);
    }
    
    public List<CountClient> getTopClient(){
        List<CountClient> res=new ArrayList<>();
        List<Object[]> report=crud.countReservationByStartDate();
        for (int i = 0; i < report.size(); i++) {
            /*
            Client cli=(Client) report.get(i)[0];
            Integer cantidad=(Integer) report.get(i)[1];
            CountClient cc=new CountClient(cantidad,cli);
            res.add(cc);
            */
            res.add(new CountClient((Log) report.get(i)[1],(Client)report.get(i)[0] ));

            
        }
        return res;
    }
}
