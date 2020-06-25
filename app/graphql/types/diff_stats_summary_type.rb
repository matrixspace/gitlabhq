# frozen_string_literal: true

module Types
  # rubocop: disable Graphql/AuthorizeTypes
  # Types that use DiffStatsType should have their own authorization
  class DiffStatsSummaryType < BaseObject
    graphql_name 'DiffStatsSummary'

    description 'Aggregated summary of changes'

    field :additions, GraphQL::INT_TYPE, null: false,
          description: 'Number of lines added'
    field :deletions, GraphQL::INT_TYPE, null: false,
          description: 'Number of lines deleted'
    field :changes, GraphQL::INT_TYPE, null: false,
          description: 'Number of lines changed'

    def changes
      object[:additions] + object[:deletions]
    end
  end
  # rubocop: enable Graphql/AuthorizeTypes
end
