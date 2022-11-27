package hs.mintic.registraduria.voto;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VotoRepository extends MongoRepository<Voto, String> {
	
}


