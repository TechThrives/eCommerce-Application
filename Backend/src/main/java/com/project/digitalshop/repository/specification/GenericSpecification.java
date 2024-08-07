package com.project.digitalshop.repository.specification;

import org.springframework.data.jpa.domain.Specification;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;

import java.util.ArrayList;
import java.util.List;

public class GenericSpecification<T> {

    private String searchVal;
    private List<String> columns;

    public GenericSpecification(String searchVal, List<String> columns) {
        this.searchVal = searchVal;
        this.columns = columns;
    }

    public Specification<T> buildSpecification() {
        return (Root<T> root, CriteriaQuery<?> query, CriteriaBuilder builder) -> {
            List<Predicate> predicates = new ArrayList<>();

            if (searchVal != null && !searchVal.isEmpty() && columns != null && !columns.isEmpty()) {
                List<Predicate> orPredicates = new ArrayList<>();
                String likeSearch = "%" + searchVal.toLowerCase() + "%";
                for (String column : columns) {
                    orPredicates.add(builder.like(
                            builder.lower(root.get(column)),
                            likeSearch));
                }
                predicates.add(builder.or(orPredicates.toArray(new Predicate[0])));
            }

            return builder.and(predicates.toArray(new Predicate[0]));
        };
    }
}
