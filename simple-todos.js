// MyCollection = new Mongo.Collection("my-collection");
// if (Meteor.isClient) {
//   // This code only runs on the client
//   Template.body.helpers({
//     tasks: [
//       { text: "This is task 1" },
//       { text: "This is task 2" },
//       { text: "This is task 3" }
//     ]
//   });
// }

Tasks = new Mongo.Collection("tasks");

if (Meteor.isClient) {
  // This code only runs on the client
  Template.body.helpers({
    tasks: function () {
      // Afficher les dernières tâches au sommet
      return Tasks.find({}, {sort: {createdAt: -1}});
    }
  });

  Template.body.events({
  "submit .new-task": function (event) {
    // Prevent default browser form submit :\\  Empêcher forme par défaut du navigateur soumettre
    event.preventDefault();

    // Get value from form element :\\ Retourne la valeur de l'élément de forme
    var text = event.target.text.value;

    // Insert a task into the collection :\\ Insérer une tâche dans la collection
    Tasks.insert({
      text: text,
      createdAt: new Date() // current time
    });

    // Clear form
    event.target.text.value = "";
  }
});
}
