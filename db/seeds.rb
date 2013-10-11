# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)


TodoItem.delete_all

time = Time.now

(1..5).each do |i|
	TodoItem.create task: "test task #{i}", due_date: 10.minutes.since(time)
end

(1..5).each do |i|
	TodoItem.create task: "completed task #{i}", due_date: 10.minutes.ago, complete: true
end