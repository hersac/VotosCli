package hs.mintic.registraduria.candidato;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CandidatoRepository extends MongoRepository<Candidato, String> {
	
}


