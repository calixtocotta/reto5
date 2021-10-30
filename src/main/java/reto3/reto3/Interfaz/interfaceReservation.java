/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package reto3.reto3.Interfaz;

import java.util.Date;
import java.util.List;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import reto3.reto3.Entidad.Reservation;

/**
 *
 * @author USUARIO
 */
public interface interfaceReservation extends CrudRepository<Reservation, Integer> {
    
    //select count(campo) from tablas where condicion
    //JPQL
    @Query("SELECT c.client, COUNT(c.client) FROM Reservation AS c group by c.client order by COUNT(c.client) desc")
    public List<Object[]> countReservationByClient();

    public List<Reservation> findAllByStartDateAfterAndStartDateBefore(Date dateOne, Date DateTwo);

    public List<Reservation> findAllByStatus(String Status);
}
