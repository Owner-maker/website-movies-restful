package com.project.movies.models;

import javax.persistence.*;

@Entity
@Table(name = "roles")
public class Role {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long Id;

    @Enumerated(EnumType.STRING)
    @Column(length = 20)
    private ERole name;

    public Role() {}

    public Role(ERole name) {
        this.name = name;
    }

    public Long getId() {
        return Id;
    }

    public ERole getName() {
        return name;
    }

    public void setId(Long id) {
        Id = id;
    }

    public void setName(ERole name) {
        this.name = name;
    }
}
