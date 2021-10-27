package reto3.reto3.Repositorio;

import reto3.reto3.Entidad.Category;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import reto3.reto3.Interfaz.interfaceCategory;

@Repository
public class RepositorioCategory {

    @Autowired
    private interfaceCategory crud;

    public List<Category> getAll() {
        return (List<Category>) crud.findAll();
    }

    public Optional<Category> getCategory(int id) {
        return crud.findById(id);
    }

    public Category save(Category category) {
        return crud.save(category);
    }

    //DELETE
    public void delete(Category category) {
        crud.delete(category);
    }

}
