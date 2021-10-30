/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package reto3.reto3.Servicios;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import reto3.reto3.ControladorWeb.custom.CountClient;
import reto3.reto3.ControladorWeb.custom.StatusAmount;
import reto3.reto3.Repositorio.RepositorioReservation;
import reto3.reto3.Entidad.Reservation;

@Service
public class serviciosReservation {

    @Autowired
    private RepositorioReservation metodosCrud;

    public List<Reservation> getAll() {
        return metodosCrud.getAll();
    }

    public Optional<Reservation> getReservation(int id) {
        return metodosCrud.getReservation(id);
    }

    public Reservation save(Reservation reservation) {
        if (reservation.getIdReservation() == null) {
            return metodosCrud.save(reservation);
        } else {
            Optional<Reservation> evt = metodosCrud.getReservation(reservation.getIdReservation());
            if (evt.isEmpty()) {
                return metodosCrud.save(reservation);
            } else {
                return reservation;
            }

        }

    }

    public Reservation update(Reservation reservation) {
        if (reservation.getIdReservation() != null) {
            return metodosCrud.save(reservation);
        } else {
            Optional<Reservation> e = metodosCrud.getReservation(reservation.getIdReservation());
            if (!e.isEmpty()) {
                if (reservation.getStartDate() != null) {
                    e.get().setStartDate(reservation.getStartDate());
                }
                if (reservation.getDevolutionDate() != null) {
                    e.get().setDevolutionDate(reservation.getDevolutionDate());
                }
                if (reservation.getClient() != null) {
                    e.get().setClient(reservation.getClient());
                }
                metodosCrud.save(e.get());
                return e.get();
            } else {
                return reservation;
            }
        }
    }

    public boolean deleteReservation(int id) {

        Boolean aBoolean = getReservation(id).map(reservation -> {
            metodosCrud.delete(reservation);
            return true;
        }).orElse(aBoolean = false);

        return aBoolean;
    }

    public List<CountClient> getTopClient() {

        return metodosCrud.getTopClient();
    }

    public StatusAmount getStatusReport() {
        List<Reservation> completed = metodosCrud.getReservationByStatus("completed");
        List<Reservation> cancelled = metodosCrud.getReservationByStatus("cancelled");

        StatusAmount descAmt = new StatusAmount(completed.size(), cancelled.size());
        return descAmt;
    }

    public List<Reservation> getReservationPeriod(String d1, String d2) {
        SimpleDateFormat parser = new SimpleDateFormat("yyyy-MM-dd");
        Date dateOne = new Date();
        Date dateTwo = new Date();
        try {
            dateOne = parser.parse(d1);
            dateTwo = parser.parse(d1);
        } catch (ParseException e) {
        }
        if (dateOne.before(dateTwo)) {
            return metodosCrud.getReservationByPeriod(dateOne, dateTwo);
        } else {
            return new ArrayList<>();
        }

    }
}
