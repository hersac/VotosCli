package hs.mintic.registraduria.mesa;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MesaRepository extends MongoRepository<Mesa, String>{
	
}


