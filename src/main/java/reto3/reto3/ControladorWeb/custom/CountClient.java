/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package reto3.reto3.ControladorWeb.custom;

import org.hibernate.annotations.common.util.impl.Log;
import reto3.reto3.Entidad.Client;

/**
 *
 * @author calix
 */
public class CountClient {

    private Log total;
    private Client client;

    public CountClient(Log total, Client client) {
        this.total = total;
        this.client = client;
    }
    
    public Log getTotal() {
        return total;
    }

    public void setTotal(Log total) {
        this.total = total;
    }

    public Client getClient() {
        return client;
    }

    public void setClient(Client client) {
        this.client = client;
    }
    
    
}
