package edu.ucsb.cs156.happiercows.jobs;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import edu.ucsb.cs156.happiercows.repositories.CommonsRepository;
import edu.ucsb.cs156.happiercows.repositories.ProfitRepository;
import edu.ucsb.cs156.happiercows.repositories.UserCommonsRepository;
import edu.ucsb.cs156.happiercows.repositories.UserRepository;
import edu.ucsb.cs156.happiercows.services.jobs.JobContextConsumer;

@Service
public class MilkTheCowsJobFactorySingleCommons {
    

    @Autowired
    private CommonsRepository commonsRepository;

    @Autowired
    private UserCommonsRepository userCommonsRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ProfitRepository profitRepository;

    public JobContextConsumer create(Long commonsID) {
        return new MilkTheCowsJobSingleCommons(
                commonsRepository,
                userCommonsRepository,
                userRepository,
                profitRepository,
                commonsID);
    }
    public JobContextConsumer create() {
        return new MilkTheCowsJobSingleCommons(
            commonsRepository,
            userCommonsRepository,
            userRepository,
            profitRepository,
            commonsID);
    }
}
